/* eslint-disable arrow-parens */
/* eslint-disable no-case-declarations */
import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  projects: [
    // dummy data: ubadah has to add data here
    {
      title: 'first',
      id: 1,
      logs: [],
    },
    {
      title: 'second',
      id: 2,
      logs: [],
    },

    {
      title: 'third',
      id: 3,
      logs: [],
    },
  ],
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS: {
      const newState = {
        ...state,
        loading: true,
        error: false,
        userData: {
          repositories: false,
        },
      };

      return newState;
    }
    case LOAD_REPOS_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        userData: {
          repositories: action.repos,
        },
        currentUser: action.username,
      };
      return newState;
    }

    case LOAD_REPOS_ERROR: {
      return { ...state, error: action.error, loading: false };
    }
    // ============== ProjectLogs ============= //
    case 'PROJECT_LOG':
      const { item, price, shop } = action;
      const projectList = state.projects;
      projectList
        .find(project => {
          return action.projectTitle === project.title;
        })
        .logs.push({
          item,
          price,
          shop,
          username: 'static username',
          date: new Date(),
          id: Math.random(),
        });
      return {
        ...state,
        projects: projectList,
      };

    default:
      return state;
  }
}

export default appReducer;
