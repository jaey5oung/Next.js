import Date from "../../components/Date"
import Layout from "../../components/Layout"
import utilStyles from "../../styles/utils.module.css"

import { getAllPostIds, getPostData } from "../../lib/posts"
import Head from "next/head"
import { useRouter } from "next/router"

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
    // false 없는 링크로 갔을때 404를 떨굼
  }
}
export async function getStaticProps({ params }) {
  console.log(params)
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}

export default function Post({ postData }) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>loading...</div>
  }
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}
