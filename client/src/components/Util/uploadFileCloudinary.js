export const uploadFileCloudinary=async(pics,type)=> {
    if(pics) {

        const data=new FormData();
        data.append("file",pics);
        data.append("upload_preset","qubqan3p");
        data.append("cloud_name","dlzrcuumq");

        let res=null;

        if(type==1) {
            res=await fetch("https://api.cloudinary.com/v1_1/dlzrcuumq/image/upload",{
                method:"post",
                body:data
            });
        }else {
            res=await fetch("https://api.cloudinary.com/v1_1/dlzrcuumq/video/upload",{
                method:"post",
                body:data
            });
        }
        const fileData=await res.json();

        return fileData.url.toString();

    }else {
        console.log("error from cloudinary function");
    }
}