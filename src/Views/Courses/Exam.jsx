import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getCourseDetail } from "../../Services/CoursesService"

const Exam = () => {

    const { id } = useParams()
    const [course, setCourse] = useState({})
    const [exam, setExam] = useState({})

    useEffect(() => {
        getCourseDetail(id)
            .then((response) => {
                console.log(response)
                setCourse(response)
                setExam(response.exam)
            }).catch((error) => {
                console.log(error);
            });
    }, [id])

    console.log(exam);

    return (
        <div>
            <h1>Exam</h1>
        </div>
    )
}

export default Exam