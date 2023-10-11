import { IWorkoutsState } from '@/store/modules/workouts/types'
import { IPagination } from '@/types/api'
import { ICurrentCommentEdition, IWorkout } from '@/types/workouts'

export const workoutsState: IWorkoutsState = {
  calendar_workouts: [],
  timeline_workouts: [],
  pagination: <IPagination>{},
  user_workouts: [],
  workoutData: {
    gpx: '',
    loading: false,
    workout: <IWorkout>{},
    chartData: [],
    comments: [],
    commentsLoading: null,
    currentCommentEdition: <ICurrentCommentEdition>{},
    currentReporting: false,
  },
}
