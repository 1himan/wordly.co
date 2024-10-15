import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function ExploreSkeleton() {
  return (
    <Stack spacing={1}>
      <div className="w-[99vw] mt-2 flex flex-col lg:flex-row bg-slate-00 lg:w-[85%] h-[90%]">
        <div className="h-full p-4 lg:w-[30%] mt-2 ">
          <div>
            <Skeleton variant="rounded" height={60} animation="wave" />
          </div>
        </div>
        <div className="lg:w-[69%] my-2 px-2">
          <div className="w-full h-[90vh] flex-col overflow-y-auto pb-20">
            <Skeleton
              variant="rounded"
              className="border-b-2 mt-7 mr-2 flex"
              height={170}
              animation="wave"
            />
            <Skeleton
              variant="rounded"
              className="border-b-2 mt-7 mr-2 flex"
              height={170}
              animation="wave"
            />
            <Skeleton
              variant="rounded"
              className="border-b-2 mt-7 mr-2 flex"
              height={170}
              animation="wave"
            />
            <Skeleton
              variant="rounded"
              className="border-b-2 mt-7 mr-2 flex"
              height={170}
              animation="wave"
            />
            <Skeleton
              variant="rounded"
              className="border-b-2 mt-7 mr-2 flex"
              height={170}
              animation="wave"
            />
            <Skeleton
              variant="rounded"
              className="border-b-2 mt-7 mr-2 flex"
              height={170}
              animation="wave"
            />
          </div>
        </div>
      </div>
    </Stack>
  );
}
