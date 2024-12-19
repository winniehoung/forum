//api calls for managing posts

import axios from "axios";

export const fetchPosts = async () => {
    try {
        const res = await axios.get('http://localhost:8082/posts');
        const deletedres=await axios.get('http://localhost:8082/posts/accessibility/deleted');
        // if (res.data.success) {
        const posts = res.data.success?res.data.data:_data;
        const deletedposts=deletedres.data.success?deletedres.data.data:_deleteddata;
        
        // id, title, author, date
        const data = posts.map((post) => [
            post.postId, post.title, post.userId, new Date(post.metadata.createdAt).toLocaleDateString(),
        ]);
        // id, title, author, date, status
        const admindata = posts.map((post) => [
            post.postId, post.title, post.userId, new Date(post.metadata.createdAt).toLocaleDateString(), post.accessibility === 'PUBLISHED' ? 'Active' : 'Inactive',
        ]);
        // id,title,author,date
        const deleteddata = deletedposts.map((post) => [
            post.postId, post.title, post.userId, new Date(post.metadata.createdAt).toLocaleDateString(),
        ])
        return { data, admindata ,deleteddata};
        // }
        // return { data: _data, admindata: _admindata };
    } catch (error) {
        console.log(error);
        return { data: _data, admindata: _admindata,deleteddata:_deleteddata };
    }
}
const _data = [
    [1, 'Easy Bread Pudding Recipe', 'win', '2024-12-15'],
    [2, 'Zwilling Chopsticks', 'win', '2024-12-33'],
    [3, 'Staub Macaroon Dinnerware', 'seabass', '2000-12-12'],
    [4, 'Holiday Treats', 'seabass', '2020-12-12'],
];
// status: ban, unban
const _admindata = [
    [1, 'Easy Bread Pudding Recipe', 'win', '2024-12-15', 'Active'],
    [2, 'Zwilling Chopsticks', 'win', '2024-12-33', 'Inactive'],
    [3, 'Staub Macaroon Dinnerware', 'seabass', '2000-12-12', 'Active'],
    [4, 'Holiday Treats', 'seabass', '2020-12-12', 'Inactive'],
];
// admin tabs: for deleted posts
const _deleteddata = [
    [1, 'Easy Bread Pudding Recipe', 'win', '2024-12-15'],
    [2, 'Zwilling Chopsticks', 'win', '2024-12-33',],
    [3, 'Staub Macaroon Dinnerware', 'seabass', '2000-12-12'],
];