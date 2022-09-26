import React, {useState, useEffect} from "react";
import { Tabs, Button, message, Row, Col } from 'antd';
import axios from "axios";
import { SELECTION_ALL } from "antd/lib/table/hooks/useSelection";
import { SEARCH_KEY, BASE_URL, TOKEN_KEY } from "../constants";

import SearchBar from "./SearchBar";
import PhotoGallery from "./PhotoGallery"
import CreatePostButton from "./CreatePostButton";

const { TabPane } = Tabs;

// reference from https://ant.design/components/tabs/ Basic & Extra content
function Home(props) {    
    const [activeTab, setActiveTab] = useState("image")
    const [posts, setPosts] = useState([]);
    const [searchOption, setSearchOption] = useState({
        type: SEARCH_KEY.all,
        keyword: ""
    })

    //refer to https://github.com/benhowell/react-grid-gallery#readme
    const renderPosts = option => {
        // case1: !post || posts is empty => no data
        // case2: option: image => filter images and display
        // case3: option: video => filter video and display
        if(!posts || posts.length === 0) return <div> No Data</div>
        if(option === "image") {
            // remove all non-image posts
            // add attribute to each image post
            // post image[] to PhotoGallery
            const imageArr = posts
                .filter(post => post.type === "image")
                .map(post => {
                    return{
                        postId: post.id,
                        src: post.url,
                        thumbnail: post.url,
                        thumbnailWidth: 300,
                        thumbnailHeight: 200,
                        user: post.user,
                        caption: post.message
                    }
                })             
            return <PhotoGallery images = {imageArr}/>
            //return "image"
        }
        else { // option === "video"
            return (
                <Row gutter={32}> {
                        posts.filter( post => post.type === "video")
                             .map( post => (
                                <Col span={8} key={post.url}>
                                    <video src={post.url} controls={true} className="video-block" />
                                    <p> {post.user}:{post.message} </p>
                                </Col>
                             ))
                    }
                </Row>
            )
        };

    }
    
    const fetchPost = (option) => {
        // get searchType and content
        // send fetching request to the server
        // get response
        //  case1: fetch successfully => update posts
        //  case2: fetch failed => inform users
        const {type, keyword} = option;
        let url = "";

        if (type === SEARCH_KEY.all) {
            url = `${BASE_URL}/search`;
        }else if (type === SEARCH_KEY.user) {
            url = `${BASE_URL}/search?user=${keyword}`;
        }else {
            url = `${BASE_URL}/search?keywords=${keyword}`;
        }

        const opt = {
            method: "GET",
            url: url,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        }

        axios(opt)
            .then( res => {
                if(res.status === 200) {
                    console.log(res.data);
                    setPosts(res.data);
                }
            })
            .catch(err => {
                message.error("Fetch posts failed");
                console.log("fetch posts failed: ", err.message);
            })

    }

    //可以直接改，不需要解构
    const handleSearch = option => {
        console.log('option ->', option);
        //get search result from the server
        // => update searchoption => call fetchPost()
        setSearchOption({ type: option.type, keyword : option.keyword})
    }

    const showPost = (postType) => {
        // post type
        console.log('post type -> ', postType)
        setActiveTab(postType);
        setTimeout(()=>{
            //refresh post list
            setSearchOption({ type: SEARCH_KEY.all, keyword : ""})
        }, 3000)
    }

    // new CreatPostButtom() => this -> {} -> { form: postFormInstance } => return instance
    const operations = <CreatePostButton onShowPost={showPost}/> 

    useEffect(() => {
        // fetch posts from the server
        //  do search the first time
        //      -> didMount -> search option: {type: all, value: ""}
        //  after the first search
        //      -> didUpdate -> search option: {type: keyword / user, value: searchContent}
        fetchPost(searchOption);
    },[searchOption]);

     

    return (
        <div className="home">
            <SearchBar handleSearch={handleSearch}/>

            <div className = "display">
                <Tabs defaultActiveKey="image" 
                      activeKey={activeTab}
                      onChange={key => setActiveTab(key)}
                      tabBarExtraContent={operations}
                >
                    <TabPane tab="Images" key="image"> 
                        {renderPosts("image")}
                    </TabPane>
                    <TabPane tab="Video" key="video">
                        {renderPosts("video")}
                    </TabPane>
                </Tabs>
            </div>

        </div>
    );
}

export default Home;