export enum WorkoutsActions {
  ADD_COMMENT = 'ADD_COMMENT',
  ADD_WORKOUT = 'ADD_WORKOUT',
  ADD_WORKOUT_WITHOUT_GPX = 'ADD_WORKOUT_WITHOUT_GPX',
  DELETE_WORKOUT = 'DELETE_WORKOUT',
  DELETE_WORKOUT_COMMENT = 'DELETE_WORKOUT_COMMENT',
  EDIT_WORKOUT = 'EDIT_WORKOUT',
  EDIT_WORKOUT_COMMENT = 'EDIT_WORKOUT_COMMENT',
  GET_CALENDAR_WORKOUTS = 'GET_CALENDAR_WORKOUTS',
  GET_USER_WORKOUTS = 'GET_USER_WORKOUTS',
  GET_TIMELINE_WORKOUTS = 'GET_TIMELINE_WORKOUTS',
  GET_MORE_TIMELINE_WORKOUTS = 'GET_MORE_TIMELINE_WORKOUTS',
  GET_WORKOUT_DATA = 'GET_WORKOUT_DATA',
  GET_WORKOUT_COMMENT = 'GET_WORKOUT_COMMENT',
  GET_WORKOUT_COMMENTS = 'GET_WORKOUT_COMMENTS',
  LIKE_COMMENT = 'LIKE_COMMENT',
  LIKE_WORKOUT = 'LIKE_WORKOUT',
  MAKE_APPEAL = 'MAKE_COMMENT_APPEAL',
  UNDO_LIKE_COMMENT = 'UNDO_LIKE_COMMENT',
  UNDO_LIKE_WORKOUT = 'UNDO_LIKE_WORKOUT',
}

export enum WorkoutsGetters {
  APPEAL_LOADING = 'APPEAL_LOADING',
  CALENDAR_WORKOUTS = 'CALENDAR_WORKOUTS',
  CURRENT_REPORTING = 'CURRENT_REPORTING',
  SUCCESS = 'SUCCESS',
  TIMELINE_WORKOUTS = 'TIMELINE_WORKOUTS',
  USER_WORKOUTS = 'USER_WORKOUTS',
  WORKOUT_DATA = 'WORKOUT_DATA',
  WORKOUTS_PAGINATION = 'WORKOUTS_PAGINATION',
}

export enum WorkoutsMutations {
  ADD_TIMELINE_WORKOUTS = 'ADD_TIMELINE_WORKOUTS',
  EMPTY_WORKOUTS = 'EMPTY_WORKOUTS',
  EMPTY_CALENDAR_WORKOUTS = 'EMPTY_CALENDAR_WORKOUTS',
  EMPTY_WORKOUT = 'EMPTY_WORKOUT',
  SET_APPEAL_LOADING = 'SET_APPEAL_LOADING',
  SET_CALENDAR_WORKOUTS = 'SET_CALENDAR_WORKOUTS',
  SET_TIMELINE_WORKOUTS = 'SET_TIMELINE_WORKOUTS',
  SET_USER_WORKOUTS = 'SET_USER_WORKOUTS',
  SET_WORKOUT = 'SET_WORKOUT',
  SET_WORKOUT_GPX = 'SET_WORKOUT_GPX',
  SET_WORKOUT_CHART_DATA = 'SET_WORKOUT_CHART_DATA',
  SET_WORKOUT_LOADING = 'SET_WORKOUT_LOADING',
  SET_WORKOUTS_PAGINATION = 'SET_WORKOUTS_PAGINATION',
  ADD_WORKOUT_COMMENT = 'ADD_WORKOUT_COMMENT',
  SET_WORKOUT_COMMENTS = 'SET_WORKOUT_COMMENTS',
  SET_COMMENT_LOADING = 'SET_COMMENT_LOADING',
  SET_CURRENT_COMMENT_EDITION = 'SET_CURRENT_COMMENT_EDITION',
  SET_CURRENT_REPORTING = 'SET_CURRENT_REPORTING',
  SET_SUCCESS = 'SET_SUCCESS',
}
