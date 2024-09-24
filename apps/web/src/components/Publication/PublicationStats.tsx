import Likes from "@components/Shared/Modal/Likes";
import getPublicationsViews from "@hey/helpers/getPublicationsViews";
import nFormatter from "@hey/helpers/nFormatter";
import type { PublicationStats as IPublicationStats } from "@hey/lens";
import { Modal } from "@hey/ui";
import Link from "next/link";
import plur from "plur";
import type { FC } from "react";
import { memo, useEffect, useState } from "react";

interface PublicationStatsProps {
  publicationId: string;
  publicationStats: IPublicationStats;
}

const PublicationStats: FC<PublicationStatsProps> = ({
  publicationId,
  publicationStats
}) => {
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    // Get Views
    getPublicationsViews([publicationId]).then((viewsResponse) => {
      setViews(viewsResponse?.[0]?.views);
    });
  }, [publicationId]);

  const { bookmarks, comments, countOpenActions, mirrors, quotes, reactions } =
    publicationStats;

  const showStats =
    comments > 0 ||
    reactions > 0 ||
    mirrors > 0 ||
    quotes > 0 ||
    countOpenActions > 0 ||
    bookmarks > 0 ||
    views > 0;

  if (!showStats) {
    return null;
  }

  return (
    <>
      <div className="divider" />
      <div className="ld-text-gray-500 flex flex-wrap items-center gap-x-6 gap-y-3 py-3 text-sm">
        {comments > 0 ? (
          <span>
            <b className="text-black dark:text-white">{nFormatter(comments)}</b>{" "}
            {plur("Comment", comments)}
          </span>
        ) : null}
        {mirrors > 0 ? (
          <Link
            className="outline-offset-2"
            href={`/posts/${publicationId}/mirrors`}
          >
            <b className="text-black dark:text-white">{nFormatter(mirrors)}</b>{" "}
            {plur("Mirror", mirrors)}
          </Link>
        ) : null}
        {quotes > 0 ? (
          <Link
            className="outline-offset-2"
            href={`/posts/${publicationId}/quotes`}
          >
            <b className="text-black dark:text-white">{nFormatter(quotes)}</b>{" "}
            {plur("Quote", quotes)}
          </Link>
        ) : null}
        {reactions > 0 ? (
          <button
            className="outline-offset-2"
            onClick={() => setShowLikesModal(true)}
            type="button"
          >
            <b className="text-black dark:text-white">
              {nFormatter(reactions)}
            </b>{" "}
            {plur("Like", reactions)}
          </button>
        ) : null}
        {countOpenActions > 0 ? (
          <Link
            className="outline-offset-2"
            href={`/posts/${publicationId}/collectors`}
          >
            <b className="text-black dark:text-white">
              {nFormatter(countOpenActions)}
            </b>{" "}
            {plur("Collect", countOpenActions)}
          </Link>
        ) : null}
        {bookmarks > 0 ? (
          <span>
            <b className="text-black dark:text-white">
              {nFormatter(bookmarks)}
            </b>{" "}
            {plur("Bookmark", bookmarks)}
          </span>
        ) : null}
        {views > 0 ? (
          <span>
            <b className="text-black dark:text-white">{nFormatter(views)}</b>{" "}
            {plur("View", views)}
          </span>
        ) : null}
      </div>
      <Modal
        onClose={() => setShowLikesModal(false)}
        show={showLikesModal}
        title="Likes"
        size="md"
      >
        <Likes publicationId={publicationId} />
      </Modal>
    </>
  );
};

export default memo(PublicationStats);
