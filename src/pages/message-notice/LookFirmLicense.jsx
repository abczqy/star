/* 查看营业执照 */
import React from 'react'
import {Modal} from 'antd'
import PropTypes from 'prop-types'
import Config from 'config'
import '../../views/Operateview.scss'
class LookFirmLicense extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    hiddenModal: PropTypes.func,
    licensePhoto: PropTypes.string
  }
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div>
        <Modal
          title='营业执照'
          visible={this.props.visible}
          onCancel={this.props.hiddenModal}
          footer={[]}
          width='35vw'
          height='30vw'
        >
          <div className='looklicense' style={{textAlign: 'center'}}>
            <img src={Config.IMG_BASE_URL + this.props.licensePhoto} />
          </div>
        </Modal>
      </div>
    )
  }
}
export default LookFirmLicense
