function Footer()
{
    const year = new Date().getFullYear()

    return <footer class="bg-light text-dark text-center py-3 mt-3">
        Copyright &copy; {year} AK Labs. Confidential, unpublished property of AK Labs. Do not duplicate or distribute. Use and distribution limited solely to authorized personnel.
    </footer>
}

export default Footer
