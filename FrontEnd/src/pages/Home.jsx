import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ButtonComponents";
import { GoArrowRight } from "react-icons/go";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-50">
      <div className="flex flex-col items-center justify-center space-y-2 ">
        <h6 className="px-3 py-1 border rounded-full">
          New Feature: Multi-language Support
        </h6>
        <h1 className="text-3xl flex flex-col justify-center items-center font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          AI-Powered Code Review <br />
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent h-20">
            Detect Bugs Before They Ship
          </span>
        </h1>
      </div>
      <p className="mx-auto flex flex-col justify-center items-center max-w-[700px] text-muted-foreground md:text-xl text-gray-400">
        CodeScribe helps developers write better code with instant automated{" "}
        <span></span>
        code reviews, bug detection, and smart suggestions.
      </p>
      <Link to={"/getstarted"}>
        <Button
          variant="primary"
          className="mt-4 flex flex-row items-center gap-2 hover:gap-3"
        >
          Try it for free
          <GoArrowRight className="text-2xl " />
        </Button>
      </Link>
      <div className="relative mt-16 rounded-lg border bg-code w-full text-code-foreground overflow-hidden shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <div className="flex items-center space-x-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs">code-example.js</div>
          <div></div>
        </div>
        <div className="p-4">
          <pre className="text-sm">
            <code>
              <div>
                <span className="syntax-keyword">import</span>{" "}
                <span className="syntax-variable">React</span>, {"{ "}
                <span className="syntax-variable">useState</span>,{" "}
                <span className="syntax-variable">useEffect</span> {"}"}{" "}
                <span className="syntax-keyword">from</span>{" "}
                <span className="syntax-string">'react'</span>;
              </div>
              <br />
              <div>
                <span className="syntax-keyword">function</span>{" "}
                <span className="syntax-function">UserProfile</span>
                {"({ "}
                <span className="syntax-variable">userId</span> {"})"} {"{"}
              </div>
              <div>
                {" "}
                <span className="syntax-keyword">const</span> [
                <span className="syntax-variable">user</span>,{" "}
                <span className="syntax-variable">setUser</span>] ={" "}
                <span className="syntax-function">useState</span>(null);
              </div>
              <div>
                {" "}
                <span className="syntax-keyword">const</span> [
                <span className="syntax-variable">loading</span>,{" "}
                <span className="syntax-variable">setLoading</span>] ={" "}
                <span className="syntax-function">useState</span>(
                <span className="syntax-keyword">true</span>);
              </div>
              <div>
                {" "}
                <span className="syntax-keyword">const</span> [
                <span className="syntax-variable">error</span>,{" "}
                <span className="syntax-variable">setError</span>] ={" "}
                <span className="syntax-function">useState</span>(null);
              </div>
              <br />
              <div className="relative">
                <div className="absolute left-0 right-0 bg-red-500/20 -mx-4 px-4">
                  <span className="syntax-function">useEffect</span>(() {"=> {"}
                </div>
                <div className="absolute left-0 right-0 bg-red-500/20 -mx-4 px-4">
                  {"  "}
                  <span className="syntax-function">fetchUserData</span>();
                </div>
                <div className="absolute left-0 right-0 bg-red-500/20 -mx-4 px-4">
                  {"}"});{" "}
                  <span className="syntax-comment">
                    // Bug: Missing dependency array
                  </span>
                </div>
              </div>
              <div>
                <span className="syntax-function">useEffect</span>(() {"=> {"}
              </div>
              <div>
                {" "}
                <span className="syntax-function">fetchUserData</span>();
              </div>
              <div>
                {"}"});{" "}
                <span className="syntax-comment">
                  // Bug: Missing dependency array
                </span>
              </div>
              <br />
              <div>
                {" "}
                <span className="syntax-keyword">const</span>{" "}
                <span className="syntax-function">fetchUserData</span> ={" "}
                <span className="syntax-keyword">async</span>() {"=> {"}
              </div>
              <div>
                {" "}
                <span className="syntax-keyword">try</span> {"{"}
              </div>
              <div>
                {" "}
                <span className="syntax-function">setLoading</span>(
                <span className="syntax-keyword">true</span>);
              </div>
              <div>
                {" "}
                <span className="syntax-keyword">const</span>{" "}
                <span className="syntax-variable">response</span> ={" "}
                <span className="syntax-keyword">await</span>{" "}
                <span className="syntax-variable">fetch</span>(
                <span className="syntax-string">
                  {"`/api/users/${'{'}`user id`'}`"}
                </span>
                );
              </div>
              <div className="relative">
                <div className="absolute left-0 right-0 bg-yellow-500/20 -mx-4 px-4">
                  {"      "}
                  <span className="syntax-keyword">const</span>{" "}
                  <span className="syntax-variable">data</span> ={" "}
                  <span className="syntax-keyword">await</span>{" "}
                  <span className="syntax-variable">response</span>.
                  <span className="syntax-function">json</span>();{" "}
                  <span className="syntax-comment">
                    // Warning: No response status check
                  </span>
                </div>
              </div>
              <div>
                {" "}
                <span className="syntax-keyword">const</span>{" "}
                <span className="syntax-variable">data</span> ={" "}
                <span className="syntax-keyword">await</span>{" "}
                <span className="syntax-variable">response</span>.
                <span className="syntax-function">json</span>();{" "}
                <span className="syntax-comment">
                  // Warning: No response status check
                </span>
              </div>
              <br />
              <div>
                {" "}
                <span className="syntax-function">setUser</span>(
                <span className="syntax-variable">data</span>);
              </div>
              <div>
                {" "}
                {"}"} <span className="syntax-keyword">catch</span> (
                <span className="syntax-variable">err</span>) {"{"}
              </div>
              <div>
                {" "}
                <span className="syntax-function">setError</span>(
                <span className="syntax-variable">err</span>.
                <span className="syntax-variable">message</span>);
              </div>
              <div>
                {" "}
                <span className="syntax-variable">console</span>.
                <span className="syntax-function">log</span>(
                <span className="syntax-variable">err</span>);{" "}
                <span className="syntax-comment">
                  // Style: Consider using a proper logging service
                </span>
              </div>
              <div>
                {" "}
                {"}"} <span className="syntax-keyword">finally</span> {"{"}
              </div>
              <div>
                {" "}
                <span className="syntax-function">setLoading</span>(
                <span className="syntax-keyword">false</span>);
              </div>
              <div> {"}"}</div>
              <div> {"}"}</div>
              <br />
              <div>
                {" "}
                <span className="syntax-keyword">if</span> (
                <span className="syntax-variable">loading</span>){" "}
                <span className="syntax-keyword">return</span>{" "}
                <span className="syntax-string">'Loading...'</span>;
              </div>
              <div>
                {" "}
                <span className="syntax-keyword">if</span> (
                <span className="syntax-variable">errorMsg</span>){" "}
                <span className="syntax-keyword">return</span>{" "}
                <span className="syntax-string">{"`Error: ${errorMsg}`"}</span>;
              </div>
              <br />
              <div>
                {" "}
                <span className="syntax-keyword">return</span> (
              </div>
              <div>
                {" "}
                <span className="syntax-variable">user</span> && (
              </div>
              <div>
                {" "}
                {"<"}
                <span className="syntax-variable">div</span>
                {">"}
              </div>
              <div>
                {" "}
                {"<"}
                <span className="syntax-variable">h1</span>
                {">"}
                {"{user.name}"}
                <span className="syntax-string">{"</h1>"}</span>
              </div>
              <div>
                {" "}
                {"<"}
                <span className="syntax-variable">p</span>
                {">"}
                {"{user.email}"}
                <span className="syntax-string">{"</p>"}</span>
              </div>
              <div> {"</div>"}</div>
              <div> )</div>
              <div> );</div>
              <div>{"}"}</div>
              <br />
              <div>
                <span className="syntax-keyword">export</span>{" "}
                <span className="syntax-keyword">default</span>{" "}
                <span className="syntax-variable">UserProfile</span>;
              </div>
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Home;
