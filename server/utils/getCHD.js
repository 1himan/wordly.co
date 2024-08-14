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