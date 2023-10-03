import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import Student from '@components/student/student';
import Instructor from '@components/instructor/instructor';

const Home: NextPage = () => {
  const [ cookies ] = useCookies(['userData']);
  const [ userData, setUserData ] = useState<any>({});
  const [ loading, setLoading ] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/user/data", {
      headers: {
        'Authorization': cookies.userData?.token
      }
    }).then((res) => {
      if (!res.data.name || !res.data.role) {
        router.push("/onboarding")
      }

      setUserData(res.data);
      setLoading(false);
    }).catch((err) => {
      window.location.replace(`/?error=${err.response?.data || "try+logging+in+again"}`)
      console.log(err)
    });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        loading ...
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Effective Team Dynamics Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col flex-grow md:flex-row overflow-auto">
        <div className="flex flex-grow flex-col w-full">
          {
            userData.role === "student" ?
              <Student data={userData} /> :
              <Instructor data={userData} />
          }
        </div>
      </div>
    </div>
  )
}

export default Home