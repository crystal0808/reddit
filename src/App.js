import React, {Component} from 'react';
import './App.css';
import {Table, Layout, Menu, Tabs} from 'antd';
import {Link} from "react-router-dom";

const {Header, Content, Footer} = Layout;
const TabPane = Tabs.TabPane;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            subreddit: 'popular',
            sortBy: 'new',
            random: '',
            pagination: {},
        };
    }

    callback(e) {
        let subreddit = this.state.subreddit;
        let sortBy = 'hot';
        if (e.key == 3) {
            sortBy = 'top';
        } else if (e.key == 2) {
            sortBy = 'new';
        }
        this.setState({sortBy: sortBy}, () => {
            this.getTableData()
        })
    }

    getTableData() {
        let subreddit = this.state.subreddit;
        let sortBy = this.state.sortBy;
        let url = "https://www.reddit.com/r/" + subreddit + "/" + sortBy + ".json";
        fetch(url).then(res => res.json()).then((result) => {
                this.setState({
                    data: result.data.children,
                })
            }
        )
    }

    callbackMenu(e) {
        let subreddit = this.state.subreddit;
        if (e.key == 1) {
            this.setState({subreddit: 'popular'}, () => {
                this.getTableData()
            })
        }
        else if (e.key == 2) {
            this.setState({subreddit: 'all'}, () => {
                this.getTableData()
            })
        } else if (e.key == 3) {
            //get random subreddit
            let url4Random = "https://www.reddit.com/r/all/random.json";
            fetch(url4Random).then(res => res.json()).then((result) => {
                    let newRandom = result[0].data.children[0].data.subreddit;
                    subreddit = this.state.random;
                    this.setState({subreddit: subreddit, random: newRandom, sortBy: 'hot'}, function () {
                        this.getTableData()
                    })
                }
            )
        }
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
                let link = "https://www.reddit.com/r/" + data.subreddit + "/comments/" + data.id;
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
                    <Menu.Item key="1"><Link to="/r/popular">Popular</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/r/all">ALL</Link></Menu.Item>
                    <Menu.Item key='3'><Link to={"/r/" + this.state.random}>RANDOM</Link></Menu.Item>
                </Menu>
                <Content>
                    <div style={{background: '#fff', padding: 24, minHeight: 280}}>
                        <Menu
                            theme="light"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{lineHeight: '44px'}}
                            onClick={this.callback.bind(this)}
                        >
                            <Menu.Item key="1"><Link to={"/r/" + this.state.subreddit + "/hot"}>Hot</Link></Menu.Item>
                            <Menu.Item key="2"><Link to={"/r/" + this.state.subreddit + "/new"}>New</Link></Menu.Item>
                            <Menu.Item key='3'><Link to={"/r/" + this.state.subreddit + "/top"}>Top</Link></Menu.Item>
                        </Menu>
                        <Table showHeader={false} columns={columns} pagination={this.state.pagination} dataSource={this.state.data}/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Reddit test ©2018 Created by Crystal L
                </Footer>
            </Layout>
        );
    }


    componentDidMount() {
        const {params} = this.props.match
        let subreddit = this.state.subreddit;
        if (params.id != undefined) {
            subreddit = params.id;
            this.setState({subreddit: subreddit})
        }
        let mainLink = "https://www.reddit.com/r/" + subreddit + "/hot.json?sort=hot";
        fetch(mainLink).then(res => res.json()).then((result) => {
                this.setState({
                    data: result.data.children,
                })
            }
        )
        let url4Random = "https://www.reddit.com/r/all/random.json";
        fetch(url4Random).then(res => res.json()).then((result) => {
                let random = result[0].data.children[0].data.subreddit;
                this.setState({random: random,})
            }
        )
    }
}

export default App;
