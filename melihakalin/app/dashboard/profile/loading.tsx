import { Loader2 } from 'lucide-react';
import React from 'react';

const ProfileLoading = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Loader2 className="animate-spin" size={54} />
    </div>
  );
};

export default ProfileLoading;
