import Dept from '../../Models/DeptModel.js'
import Subject from '../../Models/SubjectModel.js'
import Article from '../../Models/ArticleModel.js'

export const findDept = async (deptSlug) => {
    const oldDept = await Dept.findOne({
        deptSlug: deptSlug
    })
    return oldDept
}

export const findSubject = async (deptSlug, subjectSlug) => {
    const oldSubject = await Subject.findOne({
        deptSlug: deptSlug,
        subjectSlug: subjectSlug
    })
    return oldSubject
}

export const findArticle = async (deptSlug, subjectSlug, articleSlug) => {
    const oldArticle = await Article.findOne({
        deptSlug: deptSlug,
        subjectSlug: subjectSlug,
        articleSlug: articleSlug
    })
    return oldArticle
}