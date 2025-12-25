import * as React from "react";
import * as ReactDOM from "react-dom/client";
import EditContact from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import { action as editAction } from "./routes/edit.action";                  
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Index from "./routes/index";
import Root,{ action as rootAction,} from "./routes/root";
import ErrorPage from "./error-page";
import Contact,{  loader as contactLoader,action as contactAction
} from "./routes/contact";
import { loader as rootLoader } from "./routes/root.loader";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement:<ErrorPage />,
        children: [{
          path: "contacts/:contactId",
          element: <Contact />,
          loader: contactLoader,
        },
        {
          path: "contacts/:contactId/edit",
          element: <EditContact />,
          loader: contactLoader,
          action: editAction,
        },
      
        {
          path: "contacts/:contactId/destroy",
          action: destroyAction,
          errorElement: <div>Oops! There was an error.</div>,
        },
        { index: true, element: <Index /> },]

      }

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
