import React from 'react'
import { connect } from 'react-redux'

import Message from '../Common/Message'
import { updateAppConfig } from '../../actions/application'
import { history } from '../../index'
import { getFileSizeInMB } from '../../utils'

class AdminApplication extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      formData: {},
      isInEdition: false,
    }
  }

  componentDidMount() {
    this.initForm()
  }

  componentDidUpdate(prevProps) {
    if (this.props.appConfig !== prevProps.appConfig) {
      this.initForm()
    }
  }

  initForm() {
    const { appConfig } = this.props
    const formData = {}
    Object.keys(appConfig).map(k =>
      appConfig[k] === null
        ? (formData[k] = '')
        : ['max_single_file_size', 'max_zip_file_size'].includes(k)
        ? (formData[k] = getFileSizeInMB(appConfig[k]))
        : (formData[k] = appConfig[k])
    )
    this.setState({ formData })
  }

  handleFormChange(e) {
    const { formData } = this.state
    formData[e.target.name] = +e.target.value
    this.setState(formData)
  }

  toggleInEdition(e) {
    e.preventDefault()
    const { isInEdition } = this.state
    this.setState({ isInEdition: !isInEdition })
  }

  render() {
    const { message, onHandleConfigFormSubmit, t } = this.props
    const { formData, isInEdition } = this.state
    return (
      <div>
        {message && <Message message={message} t={t} />}
        {Object.keys(formData).length > 0 && (
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <strong>
                    {t('administration:Application configuration')}
                  </strong>
                </div>
                <div className="card-body">
                  <form
                    className={`app-config-form ${
                      isInEdition ? '' : 'form-disabled'
                    }`}
                    onSubmit={e => {
                      this.toggleInEdition(e)
                      onHandleConfigFormSubmit(formData)
                    }}
                  >
                    <div className="form-group row">
                      <label
                        className="col-sm-6 col-form-label"
                        htmlFor="max_users"
                      >
                        {t(
                          // eslint-disable-next-line max-len
                          'administration:Max. number of active users (if 0, no limitation)'
                        )}
                        :
                      </label>
                      <input
                        className="col-sm-5"
                        id="max_users"
                        name="max_users"
                        type="number"
                        min="0"
                        value={formData.max_users}
                        onChange={e => this.handleFormChange(e)}
                      />
                    </div>
                    <div className="form-group row">
                      <label
                        className="col-sm-6 col-form-label"
                        htmlFor="max_single_file_size"
                      >
                        {t(
                          'administration:Max. size of uploaded files (in Mb)'
                        )}
                        :
                      </label>
                      <input
                        className="col-sm-5"
                        id="max_single_file_size"
                        name="max_single_file_size"
                        type="number"
                        step="0.1"
                        min="0"
                        value={formData.max_single_file_size}
                        onChange={e => this.handleFormChange(e)}
                      />
                    </div>
                    <div className="form-group row">
                      <label
                        className="col-sm-6 col-form-label"
                        htmlFor="max_zip_file_size"
                      >
                        {t('administration:Max. size of zip archive (in Mb)')}:
                      </label>
                      <input
                        className="col-sm-5"
                        id="max_zip_file_size"
                        name="max_zip_file_size"
                        type="number"
                        step="0.1"
                        min="0"
                        value={formData.max_zip_file_size}
                        onChange={e => this.handleFormChange(e)}
                      />
                    </div>
                    <div className="form-group row">
                      <label
                        className="col-sm-6 col-form-label"
                        htmlFor="gpx_limit_import"
                      >
                        {t('administration:Max. files of zip archive')}
                      </label>
                      <input
                        className="col-sm-5"
                        id="gpx_limit_import"
                        name="gpx_limit_import"
                        type="number"
                        min="0"
                        value={formData.gpx_limit_import}
                        onChange={e => this.handleFormChange(e)}
                      />
                    </div>
                    {isInEdition ? (
                      <>
                        <input
                          type="submit"
                          className="btn btn-primary"
                          value={t('common:Submit')}
                        />
                        <input
                          type="submit"
                          className="btn btn-secondary"
                          onClick={e => this.toggleInEdition(e)}
                          value={t('common:Cancel')}
                        />
                      </>
                    ) : (
                      <>
                        <input
                          type="submit"
                          className="btn btn-primary"
                          onClick={e => {
                            this.toggleInEdition(e)
                          }}
                          value={t('common:Edit')}
                        />
                        <input
                          type="submit"
                          className="btn btn-secondary"
                          onClick={() => history.push('/admin')}
                          value={t('common:Back')}
                        />
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default connect(
  state => ({
    appConfig: state.application.config,
    message: state.message,
  }),
  dispatch => ({
    onHandleConfigFormSubmit: formData => {
      const data = Object.assign({}, formData)
      data.max_single_file_size *= 1048576
      data.max_zip_file_size *= 1048576
      dispatch(updateAppConfig(data))
    },
  })
)(AdminApplication)
