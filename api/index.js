import axios from 'axios';

// 拦截全局请求响应
axios.interceptors.response.use((res) => {
  return res.data;
});

/**
 * 获取模板
 * @returns Promise 仓库信息
 */
export async function getZhuRongRepo() {
  return axios.get("https://api.github.com/orgs/zhurong-cli/repos");
}
/**
 * 获取模板
 * @returns nest 获取仓库信息
 */
export async function tableTypeChoices() {
  return axios.get("http://localhost:3000/tableType/choices");
}

/**
 * 获取仓库下的版本
 * @param {string} repo 模板名称
 * @returns Promise 版本信息
 */
export async function getTagsByRepo(repo) {
  return axios.get(`https://api.github.com/repos/zhurong-cli/${repo}/tags`);
}

