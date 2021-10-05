# [Cardy](https://www.alpha-cardy.netlify.app) - flashcard app

## Introduction

Inspired by Anki and Memrise, Cardy is a community-driven flashcard application that uses Spaced Repetition to help you learn more efficiently.

## Table of Contents

1. [Introduction](#introduction)
2. [The Challenge](#the-challenge)
3. [My Approach](#my-approach)
4. [Tech Used](#tech-used)
5. [Project structure](#project-structure)
6. [Feature Highlights](#feature-highlights)
7. [Future development](#future-development)

## The Challenge

Implement a full-blown flashcard application with the use of React, Express, MongoDB and GraphQL. The main objective of the project was to get a better grasp of these technologies and learn Sass.

[Back to the top](#cardy---flashcard-app)

## My Approach

- To design the frontend, at first I used AdobeXD but later switched to Figma because I found it easier and more intuitive to use. The early prototypes can be found [here](https://www.figma.com/file/HeyCHNLkyKEyi1CROzWf4d/Cardy?node-id=0:1). Note that it's not organized and was used only during the first phases of development, so certain parts might be missing / different in the current version.
- For planning and organizing my thoughts, I used [Todoist](https://todoist.com/) which is a free todo app. Since a recent addition, it can be used similarly to [Trello](https://trello.com/en) where you can view your tasks in a kanban board which makes it easy to organize things visually.
  ![Example of the Cardy project during its final phase of development](https://i.imgur.com/DrepdEq.jpg)

[Back to the top](#cardy---flashcard-app)

## Tech Used

### Frontend (this repo)

- HTML
- CSS (grid, flexbox, animations)
- Sass (variables, mixins)
- CSS modules
- TypeScript
- React (a variety of hooks, context, react-router)
- Apollo Client (for GraphQL requests)
- LocalStorage
- Figma

### [Backend](https://github.com/Riyomi/cardy-backend)

- Node
- Express
- MongoDB
- Middlewares
- HTTP only cookies
- JSON web tokens
- bcrypt (to hash passwords)
- Express GraphQL (to implement GraphQL API endpoints)

### Deployment

- Netlify (frontend)
- Heroku (backend)

[Back to the top](#cardy---flashcard-app)

## Project Structure

<pre>
src
│ App.tsx
│ constants.ts
| index.tsx
| useClickOutside.ts
│
└───assets
│
└───components <-- each component has its own folder with its sass file
│ │
│ └───common <-- components that don't belong to a specific page
│ │
│ └───Browse <-- components that are used only on the Browse page
│ │
│ └───DeckDetails
│ │
│ └───Home
│ │
│ └───Profile
│  
└───contexts
│  
└───pages <-- each page has its own folder with its sass file
│  
└───queries <-- GraphQL queries and mutations in a separate folder
│  
└───sass <-- global styles and mixins
│  
└───utils <-- functions that are used in multiple components
</pre>

[Back to the top](#cardy---flashcard-app)

## Feature Highlights

### User session

To keep users logged in, I used the built-in React Context and created a simple custom hook to make user data available across all components.

```typescript
const UserContext = React.createContext<UserContextType>({
  userInfo: null,
  setUserInfo: () => {},
});

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: Props) {
  const storageUserInfo = localStorage.getItem('userInfo');
  const [userInfo, setUserInfo] = useState<UserInfo>(
    JSON.parse(storageUserInfo as string)
  );

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
```

To persist user data even on refresh, it gets saved to localStorage after logging in along with the accessToken and its date of expiration.

```typescript
const [loginUser, { error, loading }] = useMutation(LOGIN_USER, {
  onCompleted: (data) => {
    const { user, accessToken, expires } = data.loginUser;

    localStorage.setItem('userInfo', JSON.stringify(user));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('expires', expires);

    setUserInfo(user);
    history.push('/dashboard');
  },
  onError: () => {},
});
```

### Access control of routes

Before logging in, only the homepage, login and signup pages are available. If the user tries to nagivate to a different page, they get redirected. Similary, after the user has logged in, it doesn't make sense to let them navigate back to the login page. This is achieved by checking whether userInfo exists in the useEffect hook and redirect them accordingly.

```typescript
useEffect(() => {
  if (userInfo) history.push('/dashboard');
});
```

### Silent refresh of access tokens

To make user experience as smooth as possible, access token is refreshed in the background. Every time a request is made by the Apollo client, the below piece of code runs to check whether the access token has expired. If it did, a custom made callFetch function is called to get a new one (the refresh token is stored as an HTTP only cookie, so it's automatically included in the request). In case it fails, the user gets logged out.

```typescript
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  const expires = localStorage.getItem('expires');

  if (token && expires) {
    if (Date.parse(expires) - Date.now() < 0) {
      return callFetch(headers);
    } else {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    }
  }
});
```

```typescript
async function callFetch(headers: object) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      query: `mutation {
            accessToken {
              accessToken
              expires
            }
          }`,
    }),
  });

  const result = await res.json();

  if (result && result.errors) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expires');
    localStorage.removeItem('userInfo');
    return headers;
  } else {
    const { accessToken, expires } = result.data.accessToken;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('expires', expires);

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
      },
    };
  }
}
```

### Loading animation

While the server is processing the request, a simple loading animation is displayed.

```typescript
const { data, loading, error } = useQuery(GET_USER, {
  variables: { id: userInfo.id },
});

if (loading) return <Loading />;
if (error) return <Error />;
```

The custom loading component

```typescript
const Loading = () => (
  <div
    style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      margin: 'auto',
    }}
  >
    <Loader type="ThreeDots" color="#25ac64" height={100} width={100} />
  </div>
);
```

### Popup messages

On wrong input, a popup message shows up. The same component is used to let users know when they successfully followed / unfollowed someone.

```typescript
interface Props {
  message: string;
  timeout: number;
  type: 'error' | 'information' | 'success';
}

const Popup = ({ message, timeout = 3000, type = 'information' }: Props) => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    let timer = setTimeout(() => {
      setShowMessage(false);
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, setShowMessage]);

  return (
    <div
      className={`${styles.message} ${styles[type]}`}
      style={{ display: showMessage ? 'block' : 'none' }}
    >
      {message}
    </div>
  );
};
```

### User validation on the backend

For token generation and signing, I used the jwt module. For authenticating tokens, I wrote a custom authenticateToken function that returns the user object if the validation is successful; returns null otherwise.

```javascript
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

function authenticateToken(token, type = process.env.ACCESS_TOKEN_SECRET) {
  let result = null;
  jwt.verify(token, type, (err, user) => {
    if (err) return null;
    result = user;
  });
  return result;
}
```

Example of using the authenticateToken function

```javascript
const token = context.token;
const user = authenticateToken(token);
if (!user) throw new Error('Forbidden');
```

### Middleware used to extract the access token

By default, the GraphQL library I used does not have access to the req and res objects, so I had to create a middleware to add them to the context.

```javascript
app.use('/graphql', (req, res) => {
  return graphqlHTTP({
    schema,
    graphiql: true,
    context: { req, res, token: getToken(req) },
  })(req, res);
});

function getToken(req) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  return token;
}
```

Example of a GraphQL resolve function

```javascript
async resolve(parent, args, context) {
  // code
}

```

[Back to the top](#cardy---flashcard-app)

## Future development

- Currently there is no way to upload pictures (deck and profile pictures). I'd like to implement this feature by using Cloudinary / AWS.
- Currently there is no way to change user information (email, username, password).
- Pagination for cards. It can be problematic if a user has a deck with thousands of cards.
- Image and audio for cards to help users learn even more effectively.
- Export deck feature. Decks could be exported in CSV or XML format.
- Bulk add to make it easy to add hundreds of cards at once.
- Add unit and integration tests by using jest and react-testing-library.
- Make the website more secure: (1) invalidate refresh tokens when the user logs out (can be done by storing the current valid refresh tokens in the database) (2) implement CSRF protection with CSRF tokens

[Back to the top](#cardy---flashcard-app)
