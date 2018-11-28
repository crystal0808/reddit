import React, {Component} from 'react';
import './App.css';
import {Table, Layout, Menu, Breadcrumb, Tabs} from 'antd';

const {Header, Content, Footer} = Layout;
const TabPane = Tabs.TabPane;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            subreddit: 'all',
        };
    }

    callback(key) {
        console.log(key);
        let sortBy = 'hot';
        let subreddit = this.state.subreddit;

        if (key == 4) {
            //fetch new subreddit
            let url = "https://www.reddit.com/r/all/random.json";
            fetch(url).then(res => res.json()).then((result) => {
                    console.log(result)
                    subreddit = result[0].data.children[0].data.subreddit;
                    console.log(subreddit)
                    this.setState({
                        subreddit: subreddit,
                    })
                }
            )
            url = "https://www.reddit.com/r/" + subreddit + "/" + sortBy + ".json";
            console.log(url)
            fetch(url).then(res => res.json()).then((result) => {
                    console.log(result)
                    this.setState({
                        data: result.data.children,
                    })
                }
            )
        } else {
            if (key == 3) {
                sortBy = 'top';
            } else if (key == 2) {
                sortBy = 'new';
            }
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
    }

    callbackMenu(e) {
        console.log(e.key);
        let subreddit = 'all';
        let url = "https://www.reddit.com/r/all/.json";
        if (e.key == 2) {
            subreddit = 'popular';
            url = "https://www.reddit.com/r/popular.json";
        }
        this.setState({subreddit: subreddit});

        fetch(url).then(res => res.json()).then((result) => {
                console.log(result)
                this.setState({
                    data: result.data.children,
                })
            }
        )
    }

    render() {
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
                let link = "https://www.reddit.com/r/subreddit/comments/" + data.id;
                return (<div>
                        <a href={link}>{data.title}</a>
                        <div>{data.num_comments} comments</div>
                    </div>
                )
            }
        },];
        return (
            <Layout className="layout">
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{lineHeight: '64px'}}
                    onClick={this.callbackMenu.bind(this)}
                >
                    <Menu.Item key="1">POPULAR</Menu.Item>
                    <Menu.Item key="2">ALL</Menu.Item>
                </Menu>
                <Content>
                    <div style={{background: '#fff', padding: 24, minHeight: 280}}>
                        <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                            <TabPane tab="Hot" key="1">
                                <Table showHeader={false} columns={columns} dataSource={this.state.data}/>
                            </TabPane>
                            <TabPane tab="New" key="2">
                                <Table showHeader={false} columns={columns} dataSource={this.state.data}/>
                            </TabPane>
                            <TabPane tab="Top" key="3">
                                <Table showHeader={false} columns={columns} dataSource={this.state.data}/>
                            </TabPane>
                            <TabPane tab="Random" key="4">
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
        fetch("https://www.reddit.com/r/all/hot.json?sort=hot").then(res => res.json()).then((result) => {
                this.setState({
                    data: result.data.children,
                })
            }
        )
    }
}

export default App;
