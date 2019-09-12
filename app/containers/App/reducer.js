/* eslint-disable indent */
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

  // data from sign up should also be available here, to be used in ProjectLogs
  // MSW has to add data here
  // dummy data
  users: [
    { name: 'Anees Hashmi', username: 'aneeshashmi' },
    { name: 'Shehryar Wasim', username: 'MSW' },
    { name: 'Ubadah Tanveer', username: 'sotu' },
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
    case 'ADD_PROJECT_LOG':
      const { item, price, shop, payments } = action;
      const projectList = state.projects;
      projectList
        .find(project => {
          return action.projectTitle === project.title;
        })
        .logs.push({
          item,
          price,
          shop,
          payments,
          username: 'static username',
          date: new Date(),
          id: Math.random(),
        });

      return {
        ...state,
        projects: projectList,
      };
    // ========== Delete logs ============ //

    case 'DELETE_LOG':
      const currentProject = state.projects.find(proj => {
        return action.projectTitle === proj.title;
      });
      const newState = state;
      const index = state.projects.indexOf(currentProject);
      const updatedLogsArray = newState.projects[index].logs.filter(
        log => log.id !== action.id,
      );

      newState.projects[index].logs = updatedLogsArray;
      return newState;

    default:
      return state;
  }
}

export default appReducer;
