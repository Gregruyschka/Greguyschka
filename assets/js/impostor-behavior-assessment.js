const steps = Array.from( document.querySelectorAll( "form .step" ) );
const nextBtn = document.querySelectorAll( "form .next" );
const prevBtn = document.querySelectorAll( "form .prev" );
const form = document.querySelector( "form" );

document.querySelector( "#total" ).innerHTML = steps.length - 1;
document.querySelector( "#current" ).innerHTML = 1;

nextBtn.forEach( button => {
  button.addEventListener( "click", () => {
    changeStep( "next" );
  })
})
prevBtn.forEach( button => {
  button.addEventListener( "click", () => {
    changeStep( "prev" );
  })
})

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let scoreTotal = 0,
      scoreClarity = 0,
      scoreConfidence = 0,
      scoreRejection = 0,
      scorePerfectionism = 0,
      scoreInferiority = 0;

  document.querySelectorAll( "input[name^='grade-clarity']:checked" ).forEach( checked => {
    scoreClarity += parseInt( checked.value, 10 );
    return scoreClarity;
  } );

  document.querySelectorAll( "input[name^='grade-confidence']:checked" ).forEach( checked => {
    scoreConfidence += parseInt( checked.value, 10 );
    return scoreConfidence;
  } );

  document.querySelectorAll( "input[name^='grade-rejection']:checked" ).forEach( checked => { 
    scoreRejection += parseInt( checked.value, 10 );
    return scoreRejection;
  } );

   document.querySelectorAll( "input[name^='grade-perfectionism']:checked" ).forEach( checked => { 
    scorePerfectionism += parseInt( checked.value, 10 );
    return scorePerfectionism;
  } );

  document.querySelectorAll( "input[name^='grade-inferiority']:checked" ).forEach( checked => { 
    scoreInferiority += parseInt( checked.value, 10 );
    return scoreInferiority;
  } );

  scoreTotal = ( scoreClarity + scoreConfidence + scoreInferiority + scorePerfectionism + scoreRejection ) / document.querySelectorAll( "input[name^='grade-']:checked" ).length * 10;

/*   document.querySelectorAll( "input[name^='grade-']:checked" ).forEach( checked => { 
    scoreTotal += 100 / document.querySelectorAll( "input[name^='grade-']:checked" ).length * parseInt( checked.value, 10 ) / 10;
    return scoreTotal;
  } ); */

  document.getElementById( "score-total" ).value =  scoreTotal.toFixed( 2 );
  document.getElementById( "score-level" ).value = (scoreTotal <= 69) ? "Low" : "High";
  document.getElementById( "score-clarity" ).value = scoreClarity.toFixed( 2 ) / document.querySelectorAll( "input[name^='grade-clarity']:checked" ).length * 10;
  document.getElementById( "score-confidence" ).value = scoreConfidence.toFixed( 2 ) / document.querySelectorAll( "input[name^='grade-confidence']:checked" ).length * 10;
  document.getElementById( "score-rejection" ).value = scoreRejection.toFixed( 2 ) / document.querySelectorAll( "input[name^='grade-rejection']:checked" ).length * 10;
  document.getElementById( "score-perfectionism" ).value = scorePerfectionism.toFixed( 2 ) / document.querySelectorAll( "input[name^='grade-perfectionism']:checked" ).length * 10;
  document.getElementById( "score-inferiority" ).value = scoreInferiority.toFixed( 2 )/ document.querySelectorAll( "input[name^='grade-inferiority']:checked" ).length * 10;
  form.submit();
} );


function changeStep( btn ) {
  let index = 0 ;
  const active = document.querySelector( "form .step.active" );
  index = steps.indexOf( active );
  steps[ index ].classList.remove( "active" );
  if( btn === "next" ) {
    if ( active.classList.contains( "required" ) ) {
      if ( active.querySelector( "input[type=radio]:required" ) ) {
        if ( active.querySelector( "input:checked" ) ) {
          index++;
        } else {
          let ul = active.querySelector( "ul.errors-list" );
          let li = document.createElement( "li" );
          ul.append( li );
          li.append( "An answer is required" );
          ul.classList.add( "filled" )
        }
      }
      if ( active.querySelector( "input[type=checkbox]:required" ) ) {
        if ( active.querySelector( "input:checked" ) ) {
          if ( !!active.querySelector( "input#fname" ).value ) {
            if ( !!active.querySelector( "input[type=email]" ).value ) {
              index++;
            } else {
              let ul = active.querySelector( "ul.errors-list" );
              let li = document.createElement( "li" );
              ul.append( li );
              li.append( "You haven't provided an email" );
              ul.classList.add( "filled" )
            }
          } else {
            let ul = active.querySelector( "ul.errors-list" );
            let li = document.createElement( "li" );
            ul.append( li );
            li.append( "We need at least your first name" );
            ul.classList.add( "filled" )
          }
        } else {
          let ul = active.querySelector( "ul.errors-list" );
          let li = document.createElement( "li" );
          ul.append( li );
          li.append( "You need to agree to the terms and condition" );
          ul.classList.add( "filled" )
        }
      }
    } else if( !active.classList.contains( "required" )  ){
      index++;
    }
  } else if( btn === "prev" ) {
    index--;
  }
  steps[ index ].classList.add( "active" );
  document.querySelector( "#current" ).innerHTML = index + 1 ;
}