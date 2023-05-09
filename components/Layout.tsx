import Header from "../components/Header"

export default function Layout(props) {
    return (
        <div>
            <Header />
            <div className="site_content">{props.children}</div>
            <div className="spacer-60" /><div className="spacer-60" /><div className="spacer-30" />
        </div>
    )
}