import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose';
import express from 'express';
import Users from './app/models/Users.mjs';
import Label from './app/models/Label.mjs';
import Todos from './app/models/Todos.mjs';
import Code from './app/models/Code.mjs';
import connectDB from './config/database/index.mjs';

const PORT = 5000;

AdminJS.registerAdapter({ Database, Resource });

const start = async () => {
  const app = express();
  await connectDB();

  const usersNavigation = {
    name: 'Users',
    icon: 'User',
  }

  const todosNavigation = {
    name: 'Todos',
    icon: 'Todo',
  }

  const labelsNavigation = {
    name: 'Labels',
    icon: 'Label',
  }

  const codesNavigation = {
    name: 'Code',
    icon: 'Code',
  }

  const admin = new AdminJS({
    resources: [
      {
        resource: Users,
        options: {
          navigation: usersNavigation,
        },
      },
      {
        resource: Todos,
        options: {
          navigation: todosNavigation,
        },
      },
      {
        resource: Label,
        options: {
          navigation: labelsNavigation,
        },
      },
    ],
    rootPath: '/admin',
  });

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();
