import { defineConfig } from "tinacms";


// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [{
      label: 'About Page',
      name: 'About',
      path: 'src/content/about',
      format: 'md',
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Meta-Title',
          name: 'meta_title',
        },
        {
          type: 'image',
          label: 'Image',
          name: 'image',
          required: true,
        },
        {
          type: 'boolean',
          name: 'draft',
          label: 'Keep as Draft?'
        },
        {
          type:'object',
          name: 'what_i_do',
          label: 'What I Do',
          list: false,
          fields:[{
            type:'string',
            name: 'title',
            label: 'Bottom Section Title'
          },{
            name: "items",
            label: "items",
            type: "object",
            list: true,
            ui: {
              itemProps: (items) => {
                return { label: items?.name };
              },
            },
            fields: [
              {
                name: "title",
                label: "Section Title",
                type: "string",
                required: false,
              },
              {
                name: "description",
                label: "Section Description",
                type: "string",
                required: false,
              },
            ],
          },]
        },
        {
          type: "rich-text",
          name: "body",
          label: "Body",
          isBody: true,
        }
        ],
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
      },
    },
    {
      label: 'Authors',
      name: 'Authors',
      path: 'src/content/authors',
      format: 'md',
      fields: [
        {
          type: 'string',
          label: 'Author Name',
          name: 'title',
        },
        {
          type: 'image',
          label: 'Image',
          name: 'image',
          required: true,
        },
        {
          type: 'string',
          label: 'About the Author',
          name: 'description',
        },
        {
          type:'object',
          name: 'social',
          label: 'Social Media',
          list: false,
          fields:[{
            type:'string',
            name: 'facebook',
            label: 'Facebook URL'
          },
          {
            type:'string',
            name: 'twitter',
            label: 'Twitter URL'
          },
          {
            type:'string',
            name: 'Instagram',
            label: 'Instagram URL'
          },
          ],
        },
        {
          type: "rich-text",
          name: "body",
          label: "Body",
          isBody: true,
        }
        ],
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
      },
    },
      {
        name: "post",
        label: "New Post",
        path: "src/content/posts",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: 'datetime',
            label: 'Publish Date',
            name: 'date',
            required: true,
          },
          {
            type: 'image',
            label: 'Image',
            name: 'image',
            required: true,
          },
          {
            type: "string",
            name: "categories",
            list: true,
          },
          {
            type: "string",
            name: "tags",
            list: true,
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Keep as Draft?'
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
  search: {
    tina: {
      indexerToken: '8f75ddca4f33f04e60abc380cad8c34c8f5c4171',
      stopwordLanguages: ['eng'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});
