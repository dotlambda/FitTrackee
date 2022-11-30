import pytest
from flask import Flask

from fittrackee.privacy_levels import PrivacyLevel
from fittrackee.tests.workouts.test_workouts_model import WorkoutModelTestCase
from fittrackee.users.models import User
from fittrackee.workouts.exceptions import (
    PrivateWorkoutException,
    WorkoutForbiddenException,
)
from fittrackee.workouts.models import Sport, Workout

from ...utils import random_string

DATE_FORMAT = '%Y-%m-%dT%H:%M:%SZ'


class TestWorkoutModelAsRemoteFollower(WorkoutModelTestCase):
    user_status = 'remote_follower'

    def test_it_raises_exception_when_workout_visibility_is_private(
        self,
        app: Flask,
        sport_1_cycling: Sport,
        user_1: User,
        workout_cycling_user_1: Workout,
    ) -> None:
        workout_cycling_user_1.workout_visibility = PrivacyLevel.PRIVATE

        with pytest.raises(WorkoutForbiddenException):
            workout_cycling_user_1.serialize(user_status=self.user_status)

    def test_it_raises_exception_when_workout_visibility_is_local_follower_only(  # noqa
        self,
        app: Flask,
        sport_1_cycling: Sport,
        user_1: User,
        workout_cycling_user_1: Workout,
    ) -> None:
        workout_cycling_user_1.workout_visibility = PrivacyLevel.FOLLOWERS

        with pytest.raises(WorkoutForbiddenException):
            workout_cycling_user_1.serialize(user_status=self.user_status)

    @pytest.mark.parametrize(
        'input_map_visibility,input_workout_visibility',
        [
            (
                PrivacyLevel.FOLLOWERS_AND_REMOTE,
                PrivacyLevel.FOLLOWERS_AND_REMOTE,
            ),
            (
                PrivacyLevel.FOLLOWERS_AND_REMOTE,
                PrivacyLevel.PUBLIC,
            ),
            (
                PrivacyLevel.PUBLIC,
                PrivacyLevel.PUBLIC,
            ),
        ],
    )
    def test_serializer_returns_map_related_data(
        self,
        input_map_visibility: PrivacyLevel,
        input_workout_visibility: PrivacyLevel,
        app: Flask,
        sport_1_cycling: Sport,
        user_1: User,
        workout_cycling_user_1: Workout,
    ) -> None:
        workout_cycling_user_1.workout_visibility = input_workout_visibility
        workout_cycling_user_1.map_visibility = input_map_visibility
        workout = self.update_workout(
            workout_cycling_user_1, map_id=random_string()
        )

        serialized_workout = workout.serialize(user_status=self.user_status)

        assert serialized_workout['map'] == workout.map
        assert serialized_workout['bounds'] == workout.bounds
        assert serialized_workout['with_gpx'] is True
        assert serialized_workout['map_visibility'] == input_map_visibility
        assert (
            serialized_workout['workout_visibility']
            == input_workout_visibility
        )

    @pytest.mark.parametrize(
        'input_map_visibility,input_workout_visibility',
        [
            (
                PrivacyLevel.FOLLOWERS,
                PrivacyLevel.FOLLOWERS_AND_REMOTE,
            ),
            (
                PrivacyLevel.PRIVATE,
                PrivacyLevel.FOLLOWERS_AND_REMOTE,
            ),
        ],
    )
    def test_serializer_does_not_return_map_related_data(
        self,
        input_map_visibility: PrivacyLevel,
        input_workout_visibility: PrivacyLevel,
        app: Flask,
        sport_1_cycling: Sport,
        user_1: User,
        workout_cycling_user_1: Workout,
    ) -> None:
        workout_cycling_user_1.workout_visibility = input_workout_visibility
        workout_cycling_user_1.map_visibility = input_map_visibility
        workout = self.update_workout(workout_cycling_user_1)

        serialized_workout = workout.serialize(user_status=self.user_status)

        assert serialized_workout['map'] is None
        assert serialized_workout['bounds'] == []
        assert serialized_workout['with_gpx'] is False
        assert serialized_workout['map_visibility'] == input_map_visibility
        assert (
            serialized_workout['workout_visibility']
            == input_workout_visibility
        )


class TestWorkoutModelGetWorkoutActivity:
    def test_it_raises_error_if_visibility_is_private(
        self,
        app_with_federation: Flask,
        user_1: User,
        sport_1_cycling: Sport,
        workout_cycling_user_1: Workout,
    ) -> None:
        with pytest.raises(PrivateWorkoutException):
            workout_cycling_user_1.get_activities()

    @pytest.mark.parametrize(
        'workout_visibility',
        [
            PrivacyLevel.FOLLOWERS,
            PrivacyLevel.PUBLIC,
        ],
    )
    def test_it_returns_activities_when_visibility_is_not_private(
        self,
        app_with_federation: Flask,
        user_1: User,
        sport_1_cycling: Sport,
        workout_cycling_user_1: Workout,
        workout_visibility: PrivacyLevel,
    ) -> None:
        workout_cycling_user_1.workout_visibility = workout_visibility.value

        workout, note = workout_cycling_user_1.get_activities()

        assert workout['type'] == 'Create'
        assert workout['object']['type'] == 'Workout'
        assert note['type'] == 'Create'
        assert note['object']['type'] == 'Note'
