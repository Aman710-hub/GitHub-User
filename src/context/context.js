import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
import { createContext } from "react";

// THIS IS API'S ROOT ENDPOIN
const rootUrl = "https://api.github.com";

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  // for now this is default values
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // request states
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState(0);
  // error
  const [error, setError] = useState({ show: false, msg: "" });

  const searchUser = async (user) => {
    setLoading(true);
    // error handle
    // every time we search we hide error msg
    errorFunc();
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      // Метод Promise.allSettled() возвращает промис, который исполняется когда все полученные промисы
      //  завершены (исполнены или отклонены), содержащий массив результатов исполнения полученных промисов.
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        // then - returns a Promise once axios call gives succsesful response and we get acces to that response inside "then"
        .then((results) => {
          const [repos, followers] = results;
          if (repos.status === "fulfilled") {
            setRepos(repos.value.data);
          }
          if (followers.status === "fulfilled") {
            setFollowers(followers.value.data);
          }
        })
        // if axios gives Rejected response then we catch the error
        .catch((err) => console.log(err));
    } else {
      // if response is false then we display error
      errorFunc(true, "there is no such username");
    }
    setLoading(false);
    checkRequests();
  };

  const errorFunc = (show = false, msg = "") => {
    setError({ show, msg });
  };
  // check requests
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      // .then((data)) - this is how it looks like withot distructuring
      .then(({ data }) => {
        // rate: {limit: 60, remaining: 59, reset: 1659857111, used: 1, resource: 'core'}
        // this is how we get data from nested objects like above
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          errorFunc(true, "you have exceeded your rate limit");
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(checkRequests, []);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

// constom hook
export const useGlobalContext = () => {
  return React.useContext(GithubContext);
};

export { GithubContext, GithubProvider };
