import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertTriangle" size={32} className="text-error" />
      </div>
      <h3 className="text-xl font-semibold text-primary mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-600 mb-6 max-w-md">
        {message}. Please try again or contact support if the problem persists.
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          <ApperIcon name="RotateCcw" size={16} className="mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;