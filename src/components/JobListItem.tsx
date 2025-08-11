import Link from "next/link";
import SaveButton from "./SaveButton";
import { MapPin, DollarSign, Clock, Building2, ArrowRight } from "lucide-react";
import prismaClient from "@/services/prisma";

const JobListItem =({ job }) => {

  return (
    <div className="modern-card p-4 sm:p-6 group cursor-pointer">
      <div className="flex flex-col gap-3 sm:gap-4">
     
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
          <div className="flex-1">
            <h2 className="font-bold text-lg sm:text-xl text-white group-hover:text-gray-300 transition-colors mb-2" title={job.title}>
              {job.title}
            </h2>
            <div className="flex items-center gap-2 text-foreground-muted mb-3">
              <Building2 className="w-4 h-4" />
              <span className="text-sm">{ "Company Name"}</span>
            </div>
          </div>
          <div className="modern-badge w-fit">
            {job.job_type || "Full-time"}
          </div>
        </div>

        <div className="flex flex-col sm:flex-wrap sm:flex-row gap-3 sm:gap-4 text-sm text-foreground-muted">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>${job.salary?.toLocaleString() || "Competitive"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{job.work_type || "On-site"}</span>
          </div>
        </div>

        <p className="text-sm text-foreground-secondary line-clamp-3 leading-relaxed">
          {job.description}
        </p>

      
        <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-border/30">
          <Link
            href={`/jobs/${job.id}`}
            className="flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300 transition-colors group"
          >
            View Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>
      </div>
    </div>
  );
};

export default JobListItem;
