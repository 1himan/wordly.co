export default function getCHD(data) {
  let coverUrl = undefined;
  let heading = undefined;
  let description = undefined;

  for (const block of data) {
    if (block.type === "image" && !coverUrl) {
      coverUrl = block.props.url;
    }

    if (block.type === "heading" && !heading) {
      heading = block.content?.map((item) => item.text).join(" ");
    }

    if (block.type === "paragraph" && !description) {
      description = block.content?.map((item) => item.text).join(" ");
    }

    // Stop early if all values are found
    if (coverUrl && heading && description) {
      break;
    }
  }

  return {
    CoverUrl: coverUrl,
    Heading: heading,
    Description: description,
  };
}

// Example usage
const data = [
  {
    id: "8240d729-83c8-44db-a5aa-2c224173940c",
    type: "image",
    props: {
      backgroundColor: "default",
      textAlignment: "left",
      name: "image.jpg",
      url: "https://cimg.acharyaprashant.org/images/img-599af525-d2a4-4741-b1e2-78b74e7d342b/20/image.jpg",
      caption: "",
      showPreview: true,
      previewWidth: 568,
    },
    children: [],
  },
  {
    id: "c25bdfe7-2ea5-4750-b2d8-4e9d228a7ed9",
    type: "heading",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
      level: 1,
    },
    content: [
      {
        type: "text",
        text: "Hello this is a heading you know that?",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "137f4869-f2a6-40f7-a5a5-05d2e55b52c1",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "Yes you have to know that can't you see huh, this is a description and the above one is the heading you should realize and see this clearly.",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "f0314a14-08ba-463d-aad7-2595e95bfe9c",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [],
    children: [],
  },
];

// const { CoverUrl, Heading, Description } = getCHD(data);
// console.log({ CoverUrl, Heading, Description });