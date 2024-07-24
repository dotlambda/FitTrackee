export enum ReportsActions {
  EMPTY_REPORTS = 'EMPTY_REPORTS',
  GET_REPORT = 'GET_REPORT',
  GET_REPORTS = 'GET_REPORTS',
  PROCESS_APPEAL = 'PROCESS_APPEAL',
  SUBMIT_ADMIN_ACTION = 'SUBMIT_ADMIN_ACTION',
  SUBMIT_REPORT = 'SUBMIT_REPORT',
  UPDATE_REPORT = 'UPDATE_REPORT',
}

export enum ReportsGetters {
  REPORT = 'REPORT',
  REPORTS = 'REPORTS',
  REPORTS_PAGINATION = 'REPORTS_PAGINATION',
  REPORT_STATUS = 'REPORT_STATUS',
  REPORT_LOADING = 'REPORT_LOADING',
  REPORT_UPDATE_LOADING = 'REPORT_UPDATE_LOADING',
}

export enum ReportsMutations {
  EMPTY_REPORT = 'EMPTY_REPORT',
  SET_REPORTS = 'SET_REPORTS',
  SET_REPORT = 'SET_REPORT',
  SET_REPORT_LOADING = 'SET_REPORT_LOADING',
  SET_REPORT_STATUS = 'SET_REPORT_STATUS',
  SET_REPORT_UPDATE_LOADING = 'SET_REPORT_UPDATE_LOADING',
  SET_REPORTS_PAGINATION = 'SET_REPORTS_PAGINATION',
}
