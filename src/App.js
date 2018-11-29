import React, {Component} from 'react';
import './App.css';
import {Table, Layout, Menu, Tabs} from 'antd';
import Popular from './popular';
import Inbox from './Inbox';
import Message from './Message';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {withRouter} from 'react-router-dom' ;
const {Header, Content, Footer} = Layout;
const TabPane = Tabs.TabPane;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            subreddit: 'popular',
            sortBy: 'new',
            random:'',
        };
    }

    callback(key) {
        console.log(key);
        let subreddit = this.state.subreddit;
        let sortBy = 'hot';
        if (key == 3) {
            sortBy = 'top';
        } else if (key == 2) {
            sortBy = 'new';
        }
        this.setState({sortBy: sortBy}, ()=> {this.getTableData()})
     //   this.getTableData(subreddit, sortBy);


    }

    getTableData() {
        let subreddit = this.state.subreddit;
        let sortBy = this.state.sortBy;
        console.log("inside getTableData")
        console.log(subreddit)
        let url = "https://www.reddit.com/r/" + subreddit + "/" + sortBy + ".json";
        console.log(url)
        fetch(url).then(res => res.json()).then((result) => {
                console.log(result)
                this.setState({
                    data: result.data.children,
                })
            }
        )
    }
    changeMenu() {
        let randomLink = "/r/" + this.state.subreddit;
        return ;
    }
    callbackMenu(e) {
        console.log(e.key);
        let subreddit = this.state.subreddit;
        //let sortBy = this.state.sortBy;
        console.log(subreddit)
        if (e.key == 1) {
          this.setState({ subreddit: 'popular' }, () => { this.getTableData() })
        }
        else if (e.key == 2) {
          this.setState({ subreddit: 'all' }, () => { this.getTableData() })
        } else if (e.key == 3) {
          console.log("sssff")
            //get random subreddit
            let url4Random = "https://www.reddit.com/r/all/random.json";
            fetch(url4Random).then(res => res.json()).then((result) => {
                    console.log(result)
                    let newRandom = result[0].data.children[0].data.subreddit;
                    subreddit = this.state.random;
                    console.log(subreddit)
                    this.setState({ subreddit: subreddit, random: newRandom, sortBy: 'hot' }, function () { this.getTableData() })
                }
            )
        }
        console.log(subreddit)
      //  this.getTableData(subreddit, sortBy);
       // this.setState({subreddit: subreddit});

    }



    render() {
        var cur = this.state.subreddit;

        const columns = [{
            title: 'thumbnail',
            key: 'thumbnail',
            dataIndex: 'data',
            width: '7%',
            render: (data) => (
                <span>
                    <img color="blue" alt="" src={data.thumbnail} height='70'
                         width='70'></img>
                </span>
            ),
        }, {
            title: 'title',
            dataIndex: 'data',
            key: 'title',
            width: '90%',
            render: (data) => {
                let link = "https://www.reddit.com/r/" + data.subreddit + "/comments/" + data.id;
             //   console.log(link)
                return (<div>
                        <a href={link}>{data.title}</a>
                        <div>{data.num_comments} comments</div>
                    </div>
                )
            }
        },];
        var randomLink = "/r/" + this.state.random;
      //  console.log(randomLink)
        var tabLink = "/r/" + this.state.subreddit + "/" + this.state.sortBy;
        console.log(tabLink)
        return (
            <Layout className="layout">
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{lineHeight: '64px'}}
                    onClick={this.callbackMenu.bind(this)}
                >
                    <Menu.Item key="1"><Link to="/r/popular">Popular</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/r/all">ALL</Link></Menu.Item>
                    <Menu.Item key='3'><Link to={randomLink}>RANDOM</Link></Menu.Item>
                </Menu>
                <Content >
                    <div  style={{background: '#fff', padding: 24, minHeight: 280}}>
                        <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                            <TabPane tab="Hot" key="1"><Link to={tabLink}>t</Link>
                                <Table  showHeader={false} columns={columns} dataSource={this.state.data}/>
                            </TabPane>
                            <TabPane tab="New" key="2">
                                <Table showHeader={false} columns={columns} dataSource={this.state.data}/>
                            </TabPane>
                            <TabPane tab="Top" key="3">
                                <Table showHeader={false} columns={columns} dataSource={this.state.data}/>
                            </TabPane>
                        </Tabs>

                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Reddit test ©2018 Created by Crystal L
                </Footer>
            </Layout>
        );
    }


    componentDidMount() {
        const { params } = this.props.match
        console.log(params.id)
        this.setState({subreddit:params.id})
        let mainLink = "https://www.reddit.com/r/" + params.id + "/hot.json?sort=hot";
        fetch(mainLink).then(res => res.json()).then((result) => {
                this.setState({
                    data: result.data.children,
                })
            }
        )
        let url4Random = "https://www.reddit.com/r/all/random.json";
        fetch(url4Random).then(res => res.json()).then((result) => {
                console.log(result)
                let random = result[0].data.children[0].data.subreddit;
                console.log(random)
                this.setState({ random: random, })
            }
        )
    }
}

export default App;
