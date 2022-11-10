const express = require("express");
const fs = require("fs");
const matter = require("gray-matter");
const postsDirectory = `${process.cwd()}/_post`
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("asdfasdfasdf post");
})

router.get("/all", (req,res) => {
    const postData = getChildPost(postsDirectory);

    function getChildPost(path){
        const result = fs.readdirSync(path);

        return result.reduce((sum,current)=>{
            const ispost = current.includes(".md");

            if(ispost){
                const notExt = current.replace(".md","");

                const result = fs.readFileSync(`${path}/${current}`,{
                    encoding :"utf8"
                });
                const convertedData = matter(result)
                console.log();
                sum.push({
                    type:"post",
                    title:notExt,
                    path:`${path.replace(postsDirectory,"")}/${notExt}`,
                    data:{
                        ...convertedData,
                        content : convertedData.content
                        // content:result;
                    },
                });
            }else{
                sum.push({
                    type:"directory",
                    title:current,
                    children:getChildPost(`${path}/${current}`),
                });
            }
            return sum;
        },[]);
    }

    res.json(postData);
})

module.exports = router;