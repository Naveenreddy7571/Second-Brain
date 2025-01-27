import React, { useEffect } from "react";
import DeleteIcon from "../../assets/Deleteicon";
import ShareIcon from "../../assets/ShareIcon";
import ProductivyTag from "./ProductivyTag";
import { TwitterTweetEmbed, TwitterTimelineEmbed } from "react-twitter-embed";

interface CardProps {
  icon: any;
  title: string;
  link: string;
  tags?: string[];
  type?: string;
  onDelete?: () => void;
  onShare?: () => void;
}

function Card({ icon: Icon, title, link, tags = [], onDelete, onShare }: CardProps) {

  const renderContent = () => {
    if (link.includes("x.com") || link.includes("twitter.com")) {
      const tweetId = link.split("/").pop() || ""; 
      useEffect(() => {
        if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
          const script = document.createElement("script");
          script.src = "https://platform.twitter.com/widgets.js";
          script.async = true;
          document.body.appendChild(script);
        }
      }, []);

      return (
        <div className="rounded-md bg-gray-100">
         <TwitterTweetEmbed tweetId={tweetId}  />

        </div>
      );
    } else if (link.includes("youtube.com") || link.includes("youtu.be")) {
      const videoId = link.includes("youtu.be")
        ? link.split("/").pop()
        : new URL(link).searchParams.get("v");

      return (
        <iframe
          className="rounded-md"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else if (link.includes("twitter.com")) {
      return (
        <div className="rounded-md bg-gray-100">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName={link.split("/")[3]} 
            options={{
              tweetLimit: 5,
              width: "100%",
              height: 100
            }}
            theme="dark"
            noHeader={true}
            noBorders={true}
            noFooter={true}
          />
        </div>
      );
    } else {
      return <div className="text-gray-500 italic">Unsupported content</div>;
    }
  };

  return (
    <div className="border border-slate-300 rounded-lg shadow-lg max-w-md mx-auto bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-slate-100">
        <div className="flex items-center gap-2">
          <Icon />
          <div className="text-base font-semibold text-gray-800">{title}</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onShare} className="text-gray-600 hover:text-blue-600">
            <ShareIcon />
          </button>
          <button onClick={onDelete} className="text-gray-600 hover:text-red-600">
            <DeleteIcon />
          </button>
        </div>
      </div>

      <div className="p-4">{renderContent()}</div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 px-4 py-2 bg-slate-50 border-t border-slate-200">
          {tags.map((tag, index) => (
            <ProductivyTag key={index} title={tag} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Card;
