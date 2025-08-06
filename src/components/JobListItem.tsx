import Link from "next/link";
import SaveButton from "./SaveButton";

const JobListItem = ({ job }) => {
  return (
    <div className="flex flex-col justify-between bg-gray-800 rounded-xl p-6 shadow-md border border-gray-800 hover:shadow-lg hover:cursor-pointer hover:border-gray-700 transition-all duration-200">
      <div className="flex flex-col gap-3">
     
        <h2 className="font-semibold text-xl text-[#bcc0e6] truncate" title={job.title}>{job.title}</h2>

     
        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            📍 <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            💰 <span>${job.salary.toLocaleString()}</span>
          </div>
        </div>

       
        <p className="text-sm text-gray-300 mt-2 line-clamp-3">
          {job.description}
        </p>
      </div>

   
      <div className="flex justify-between items-center mt-6">
        <Link
          href={`/jobs/${job.id}`}
          className="text-sm font-medium text-blue-100 hover:text-blue-300 transition"
        >
          View Details →
        </Link>

        {/* <SaveButton job = {job} /> */}
      </div>
    </div>
  );
};

export default JobListItem;
