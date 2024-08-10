import { readData } from "./Utils";


const getJson = (obj) => {
  return JSON.stringify(obj);
};

const getUserToken = async () => {
  const data = (await readData("user_Data")) ?? null;
  return data;
};

export async function sendAuthPostData(url, obj) {
  console.log(url);
  const token = await getUserToken();
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: getJson(obj),
  });
  // console.log(await response.text());
  // return;
  let data = await response.json();
  if (!response.ok) {
    throw new ValidationError(data.message, data.errors);
  }
  return data;
}

export async function sendPostData(url, obj) {
  console.log(url);
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: getJson(obj),
    });
    // console.log(await response.text());
    // return;
    let data = await response.json();
    if (!response.ok) {
      throw new ValidationError(data.message, data.errors);
    }
    return data;
}

export async function sendGetAuthRequest(url, params = {}) {
  console.log(url);
  const token = await getUserToken();
  if (Object.keys(params).length != 0) {
    let queryString = new URLSearchParams(params);
    url += "?" + queryString.toString();
  }
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:token,
    },
  });
  // console.log("response===", response);
  // return
  let data = await response.json();
  if (!response.ok) {
    throw new ValidationError(data.message, data.errors);
  }
  return data;
}

export async function sendGetRequest(url, params = {}) {
  console.log(url);
  if (Object.keys(params).length != 0) {
    let queryString = new URLSearchParams(params);
    url += "?" + queryString.toString();
  }
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log("response===", response);
  // return;
  let data = await response.json();
  if (!response.ok) {
    throw new ValidationError(data.message, data.errors);
  }
  return data;
}

export function ValidationError(message, errors = {}) {
  const error = new Error(message);
  error.name = "ValidationError";
  error.errors = errors;
  return error;
}


