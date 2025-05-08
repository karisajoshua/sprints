
import React from "react";
import RegionsCard from "./RegionsCard";
import ProjectStatusCard from "./ProjectStatusCard";
import ImpactMetricsCard from "./ImpactMetricsCard";
import RegionalProjectsCard from "./RegionalProjectsCard";
import CoordinatorsCard from "./CoordinatorsCard";

const DashboardCards = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <RegionsCard />
        <ProjectStatusCard />
        <ImpactMetricsCard />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RegionalProjectsCard />
        <CoordinatorsCard />
      </div>
    </>
  );
};

export default DashboardCards;
