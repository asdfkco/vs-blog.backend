const express = require("express");
const fs = require("fs");
const matter = require("gray-matter");
const postDirectory = `${process.cwd()}/post`;
const router = express.Router();
router.get("/", (req, res) => {
  res.send("post");
});
router.get("/all", (req, res) => {
  const postDate = getChildPost(postDirectory);
  function getChildPost(path) {
    const result = fs.readdirSync(path);
    return result.reduce((sum, current) => {
      const isPost = current.includes(".md");
      if (isPost) {
        const notExt = current.replace(".md", "");
        const result = fs.readFileSync(`${path}/${current}`, {
          encoding: "utf-8",
        });
        const convertedData = matter(result);
        sum.push({
          type: "post",
          title: notExt,
          path: `${path.replace(postDirectory, "")}/${notExt}`,
          data: {
            ...convertedData.data,
            content: convertedData.content,
          },
        });
      } else {
        sum.push({
          type: "directory",
          title: current,
          children: getChildPost(`${path}/${current}`),
        });
      }
      return sum;
    }, []);
  }
  res.json(postDate);
});
module.exports = router;
