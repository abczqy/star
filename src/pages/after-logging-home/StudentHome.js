/**
 * 市场分析
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Tabs, Rate } from 'antd'
import HomeCarousel from './HomeCarousel'
import './StudentHome.scss'
const TabPane = Tabs.TabPane
class StudentHome extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableDatas: [],
      hotSearchDatas: [],
      currentType: 'teaching'
    }
  }
  render () {
    const datac = [{
      src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg',
      title: '超级教师',
      detail: '1111111111111333333333333333333333333333'
    },
    {
      src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg',
      title: '超级教师',
      detail: '1111111111111333333333333333333333333333'
    },
    {
      src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg',
      title: '超级教师',
      detail: '1111111111111333333333333333333333333333'
    },
    {
      src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg',
      title: '超级教师',
      detail: '1111111111111333333333333333333333333333'
    },
    {
      src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg',
      title: '超级教师',
      detail: '1111111111111333333333333333333333333333'
    }]
    return (
      <div className='logged-home'>
        <HomeCarousel />
        <div className='logged-home-recommendation'>
          <div className='popular-recommendation'>
            <div className='popular-recommendation-title'>
              <h3 className='chinese'>热门推荐</h3>
              <span className='english'>Hot recommendation</span>
              <span className='more'>更多 > ></span>
            </div>
            <div className='popular-recommendation-item'>
              {datac.map((item, index, arr) => {
                return (
                  <div key={index} className='list'>
                    <dl className='list-item'>
                      <dt className='dl-dt'><img style={{width: '100%', height: '100%'}} src={item.src} /></dt>
                      <dd className='dl-dd'>
                        <span className='dd-title'>{item.title}</span>
                        <p className='dd-p'>{item.detail}</p>
                      </dd>
                    </dl>
                    <p style={{float: 'right'}}><Link to='/operate-manage-home/all-app-detail-third'><Icon style={{backgroundColor: '#08A1E9', color: '#FFF', width: 20, height: 20, lineHeight: '20px'}} type='download' /><Button style={{width: 60, height: 20, lineHeight: '18px', fontSize: '10px', textAlign: 'center', borderBottomLeftRadius: 0, borderTopLeftRadius: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0, backgroundColor: '#40B3F9'}} type='primary'>下载</Button></Link><Icon style={{width: 20, height: 20, backgroundColor: '#FFBB45', lineHeight: '20px', color: '#fff', marginLeft: '10px'}} type='star-o' /></p>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='ranking'>
            <div className='ranking-title'>
              <h3 className='title-detail'>排行榜</h3>
              <span className='english'>Ranking</span>
            </div>
            <Tabs style={{width: '100%'}} type='card'>
              <TabPane tab='新应用' key='1'>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num'>1</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#FF9933'}}>2</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div id='bbbbbb' className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#FFCC33'}}>3</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#33CCFF'}}>4</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#33CCFF'}}>5</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#33CCFF'}}>6</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#33CCFF'}}>7</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#33CCFF'}}>8</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#33CCFF'}}>9</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#33CCFF'}}>10</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
              </TabPane>
              <TabPane tab='经典排行' key='2'>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num'>1</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#FF9933'}}>2</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div id='bbbbbb' className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#FFCC33'}}>3</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#33CCFF'}}>4</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#33CCFF'}}>5</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#33CCFF'}}>6</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#33CCFF'}}>7</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#33CCFF'}}>8</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#33CCFF'}}>9</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#33CCFF'}}>10</span>
                    <span className='title-detaila'>反恶联盟</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg' /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： 411111111111111111111</p>
                          <Rate disabled defaultValue={2.5} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>开通</Button>
                    </div>
                  </p>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

export default StudentHome
