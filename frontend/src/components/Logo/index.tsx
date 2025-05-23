import React from 'react';

type Props = {
  className?: string;
};

export default function Logo({ className = '' }: Props) {
  return (
    <img
      src={'https://avatars.githubusercontent.com/u/26446323?s=280&v=4'}
      className={className}
      alt={'Ellingson Mineral Company logo'}
    ></img>
  );
}
