import { NextPage } from "next";
import useSWR from "swr";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import http from "../utils/http";

const fetcher = (url: string) => http.get(url).then(res => res.data === "" ? [] : res.data.emails);

const EmailsPage: NextPage = () => {

  const { data } = useSWR('mail-list', fetcher, { fallbackData: [] })

  async function onSubmit() {
    event?.preventDefault();
    const emailsTextArea = document.getElementById("emails") as HTMLTextAreaElement;
    await http.post("mail-list", { emails: emailsTextArea.value.split("\n") })
  }
  return (
    <div>
      <Title>Emails</Title>
      <div className="border-b mb-4" />
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <textarea id="emails"
            className="bg-default border rounded w-full py-2 px-3 text-black dark:text-white leading-tight focus:outline-none focus:shadow-outline"
            rows={10}
            defaultValue={data.join('\n')}
          >

          </textarea>
        </div>

        <Button>Salvar</Button>
      </form>
    </div>
  );
};

export default EmailsPage