export const LoadPanel = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <div className="mt-4">読み込み中</div>
      </div>
    </div>
  );
};
