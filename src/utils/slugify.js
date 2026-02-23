export const generateSlug =(title)=>{
    return title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g,"")
    .replace(/\s+/g,"-");
}