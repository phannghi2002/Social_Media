import { useSelector } from "react-redux";

/* eslint-disable no-constant-condition */
function ChatMessage({ item }) {
  const { auth } = useSelector((store) => store);
  //chu tai khoan nhan ben trai, nguoi ban nhan ben phai
  const isReqUserMessage = auth?.user?.id === item?.user?.id;
  return (
    <div
      className={`flex ${
        isReqUserMessage ? "justify-start" : "justify-end"
      } text-white`}
    >
      <div
        className={`p-1 ${
          item.image ? "rounded-md" : "px-5 rounded-full"
        } bg-[#191c29]`}
      >
        {item.image && (
          <img
            className="w-[12rem] h-[17rem] object-cover rounded-md"
            src={item.image}
            alt="image"
          />
        )}
        <p className={`${true ? "py-2" : "py-1"}`}>{item.content}</p>
      </div>
    </div>
  );
}

export default ChatMessage;
