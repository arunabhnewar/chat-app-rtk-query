/* eslint-disable no-lone-blocks */
import gravatarUrl from "gravatar-url";
import moment from "moment";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { conversationsApi, useGetConversationsQuery } from "../../features/conversations/conversationsApi";
import getPartnerInfo from "../../utilities/getPartnerInfo";
import Error from "../ui/Error";
import ChatItem from "./ChatItem";

export default function ChatItems() {

    // use selector
    const { user } = useSelector((state) => state.auth) || {};

    // Destructure
    const { email } = user || {};

    const { data, isLoading, isError, error } = useGetConversationsQuery(email) || {};
    const { data: conversations, totalCount } = data || {};

    // use state
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // dispatch
    const dispatch = useDispatch();

    // Fetch more
    const fetchMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    // use effect
    useEffect(() => {
        if (page > 1) {
            dispatch(
                conversationsApi.endpoints.getMoreConversations.initiate({
                    email,
                    page,
                })
            );
        }
    }, [page, email, dispatch]);

    useEffect(() => {
        if (totalCount > 0) {
            const more =
                Math.ceil(
                    totalCount /
                    Number(process.env.REACT_APP_CONVERSATIONS_PER_PAGE)
                ) > page;

            setHasMore(more);
        }
    }, [totalCount, page])


    // decide what to render
    let content = null;

    if (isLoading) {
        content = <li className="m-2 text-center">Loading...</li>;
    }
    else if (!isLoading && isError) {
        content = (
            <li className="m-2 text-center">
                <Error message={error?.data} />
            </li>
        );
    }
    else if (!isLoading && !isError && conversations?.length === 0) {
        content = <li className="m-2 text-center">No conversations found!</li>;
    }
    else if (!isLoading && !isError && conversations?.length > 0) {
        content = <InfiniteScroll
            dataLength={conversations?.length} //This is important field to render the next data
            next={fetchMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            height={window.innerHeight - 129}
        >
            {
                conversations.map((conversation) => {

                    // Destructuring
                    const { id, message, timestamp } = conversation;
                    const { email } = user || {};
                    const { name, email: partnerEmail } = getPartnerInfo(
                        conversation.users,
                        email
                    );

                    return (
                        <li key={id}>
                            <Link to={`/inbox/${id}`}>
                                <ChatItem
                                    avatar={gravatarUrl(partnerEmail, { size: 80 })}
                                    name={name}
                                    lastMessage={message}
                                    lastTime={moment(timestamp).fromNow()}
                                />
                            </Link>
                        </li>
                    );
                })
            };
        </ InfiniteScroll >
    }

    return (
        <ul>
            {content}
        </ul>
    );
}
