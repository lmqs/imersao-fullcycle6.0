import { NextPage } from "next";
import useSWR from "swr";
import { Title } from "../components/Title";
import http from "../utils/http";
import { Tweet } from "../components/Tweet";
import { Tweet as TweetModel } from "../utils/models";
const fetcher = (url: string) => http.get(url).then(res => res.data);

const TweetsPage: NextPage = () => {

  const { data: tweets } = useSWR<TweetModel[]>('tweets', fetcher, { refreshInterval: 5000 })
  // console.log(tweets[0].User);

  return (
    <div>
      <Title> Tweets </Title>
      {tweets?.map((t, key) => (
        <Tweet key={key} tweet={t} />
      ))}
    </div>
  );
};

export default TweetsPage