import { JSX, useState } from "react";
import { Button } from "./ui/button";
import { User } from "../../typing";

// interface User {
//   name: string;
//   role: "ADMIN" | "USER";
// }

interface UserProfileProps {
  user: User;
  handleLogout: () => Promise<void> | void;
}

const UserProfile = ({ user, handleLogout }: UserProfileProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to get initials from name
  const getInitials = (name: string): string => {
    if (!name) return "U";

    const words = name.trim().split(" ");
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    const firstInitial = words[0].charAt(0).toUpperCase();
    const lastInitial = words[words.length - 1].charAt(0).toUpperCase();

    return firstInitial + lastInitial;
  };

  // Loading Component
  const LoadingSpinner = (): JSX.Element => (
    <div className='flex items-center justify-center'>
      <div className='animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600'></div>
    </div>
  );

  // Handle logout with loading state
  const onLogoutClick = async (): Promise<void> => {
    setIsLoading(true);

    try {
      await handleLogout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='border-t border-gray-200'>
      <div className='p-4'>
        <div className='flex items-center mb-3'>
          <div className='w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center'>
            <span className='text-white text-sm font-medium'>
              {getInitials(user?.name)}
            </span>
          </div>
          <div className='ml-3'>
            <p className='text-sm font-medium text-gray-900'>{user?.name}</p>
            <p className='text-xs text-gray-500'>
              {user?.role === "ADMIN" ? "Administrator" : "User"}
            </p>
          </div>
        </div>
        <Button
          variant='outline'
          size='sm'
          className='w-full'
          onClick={onLogoutClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              <span className='ml-2'>Logging out...</span>
            </>
          ) : (
            <>
              <svg
                className='w-4 h-4 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                />
              </svg>
              Logout
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
