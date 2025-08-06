// @ts-nocheck
import  data  from "@/constant/data";
import prismaClient from "@/services/prisma";

export default function page() {
  async function addData() {
    "use server";
    const newData = data.map((elem) => {
      return {
        title: elem.job_title,
        description: elem.job_description,
        salary: 20000,
        location: elem.job_location,
      };
    });
    
    await prismaClient.job.createMany({
      data: newData,
    });
  }
  return (
    <form action={addData}>
       <button className="text-white">Add</button>
    </form>
  );
}