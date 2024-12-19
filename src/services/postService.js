//api calls for managing posts

import axios from "axios";

export const fetchPosts = async () => {
    try {
        const res = await axios.get('http://localhost:8082/posts');
        if (res.data.success) {
            const posts = res.data.data;

            // id, title, author, date
            const data = posts.map((post) => [
                post.postId, post.title, post.userId, new Date(post.metadata.createdAt).toLocaleDateString(),
            ]);
            // id, title, author, date, status
            const admindata = posts.map((post) => [
                post.postId, post.title, post.userId, new Date(post.metadata.createdAt).toLocaleDateString(), post.status.accessibility === 'PUBLISHED' ? 'Active' : 'Inactive',
            ]);
            return { data, admindata };
        }
        return { data: _data, admindata: _admindata };
    } catch (error) {
        console.log(error);
        return { data: _data, admindata: _admindata };
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