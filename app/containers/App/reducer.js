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
      // making a copy of projectLogs without mutating state
      const projectLists = state.projects.map(project => {
        let projectLogs = project.logs.filter(project => {
          return true;
        });

        const newLog = {
          item,
          price,
          shop,
          payments,
          username: 'static username',
          date: new Date(),
          id: Math.random(),
        };
        if (action.projectTitle === project.title) {
          projectLogs = project.logs.filter(log => {
            return true;
          });
          projectLogs.push(newLog);
        }
        return Object.assign({}, project, {
          logs: projectLogs,
        });
      });
      return {
        ...state,
        projects: projectLists,
      };

    // ========== Delete logs ============ //
    case 'DELETE_LOG':
      const updatedProject = state.projects.map(project => {
        // making a copy of projectLogs without mutating state
        let newLog = project.logs.filter(project => {
          return true;
        });

        if (action.projTitle === project.title) {
          newLog = project.logs.filter(log => {
            console.log(log.id !== action.id);
            return log.id !== action.id;
          });
        }
        return Object.assign({}, project, {
          logs: newLog,
        });
      });
      return { ...state, projects: updatedProject };

    // =============== Edit log ================= //
    case 'EDIT_LOG':
      const editedProject = state.projects.map(project => {
        // making a copy of projectLogs without mutating state
        let newLog = project.logs.filter(project => {
          return true;
        });

        if (action.projectTitle === project.title) {
          newLog = project.logs.filter(log => log.id !== action.log.id);
          const { item, price, shop, payments, id } = action.log;
          const editedLog = {
            item,
            price,
            shop,
            payments,
            date: new Date(),
            id,
            username: 'static username',
          };
          newLog.push(editedLog);
          // let sortedLog = newLog.sort((a, b) => a.date - b.log);
        }
        return Object.assign({}, project, {
          logs: newLog,
        });
      });

      return {
        ...state,
        projects: editedProject,
      };

    default:
      return state;
  }
}

export default appReducer;
