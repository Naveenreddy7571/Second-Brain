import axios from "axios";
/* eslint-disable no-useless-catch, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

const apiClient = axios.create({
  baseURL: "https://second-brain-backend-beta.vercel.app/api/v1", 
  headers: {
    "Content-Type": "application/json",
  },
});



interface UserInfo {
  username: string;
  password: string;
}

interface contentInfo{
  type:string,
  link:string,
  title:string,
  tags:object
}


export async function signupService(userInfo: UserInfo) {
  try {
    const response = await apiClient.post("/signup", userInfo);
    return response; 
  } catch (error: any) {
    throw error; 
  }
}

export async function loginservice(userInfo:UserInfo)
{
    try{
        const response = await apiClient.post("/signin",userInfo);
        return response;
    }
    catch(error:any)
    {
        throw error; 
    }
}

export async function addContentService(contentInfo:contentInfo)
{
  const token = localStorage.getItem("token");
  try{
    const response=await apiClient.post("/content",contentInfo,{
      headers:{"Authorization" : `Bearer ${token}`}
    })
    return response;
  }
  catch(e:any)
  {
    throw e;
  }
}

export async function getContentService()
{
  const token = localStorage.getItem("token");
  try{
    const response = await apiClient.get("/content",
    {
      headers:{"Authorization":`Bearer ${token}`}
    }
    )
    return response;
  }
  catch(e:any)
  {
    throw e;
  }
}

export async function deleteContentService(deleteId:string)
{
  const token = localStorage.getItem("token");
  try{
    const response = await apiClient.delete("/content",
    {
      data: { content_id: deleteId },
      headers:{"Authorization":`Bearer ${token}`}
    }
    )
    return response;
  }
  catch(e:any)
  {
    throw e;
  }
}

export async function shareBrainService(isShareable: boolean) {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.post(
      "/brain/share",
      { share: isShareable },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

export async function fetchTagsService()
{
  const token = localStorage.getItem("token");
  try{
    const response = await apiClient.get("/brain/gettags");
    return response; 
  }
  catch(e:any)
  {
    throw e;
  }
}
