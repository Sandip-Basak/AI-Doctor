export default function Message({ message, Loading }) {
  return (
    <>
      {message.map((msg, index) => (
        <>
          {msg.user && (
            <div className="message" key={index}>
              <div className="userSection">
                <div className="user-Image"></div>
                <div className="user">{msg.user}</div>
              </div>
              <div className="replySection">
                {msg.reply.length > 1 ? (
                  <>
                    <div className="reply">
                      {msg.reply.map((data, index) => {
                        if (typeof(msg.reply[1])==='object' || typeof( data)==="object") {
                          return (
                            <div className="medicine">
                              {typeof data === "string" ? (
                                <div className="disease"> You might be suffering from {data}</div>
                              ) : (
                                <>
                                  <div className="symptom">{data[0]}-</div>
                                  <div className="medication">{data[1]}</div>
                                </>
                              )}
                            </div>
                          );
                        }
                        return (
                          <>
                            {index === 0 && (
                              <div className="question">
                                Do you have any of this symptoms ?
                              </div>
                            )}
                            <div className="single-reply">{data}.</div>
                          </>
                        );
                      })}
                    </div>
                    <div className="reply-Image"></div>
                  </>
                ) : (
                  <>
                    <div className="reply">{msg.reply[0].length!==2?msg.reply[0]:msg.reply[0][1]}</div>
                    <div className="reply-Image"></div>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      ))}
    </>
  );
}
